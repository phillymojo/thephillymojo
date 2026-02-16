import { InvokeCommand } from "@aws-sdk/client-lambda";
import { lambdaClient } from "@/lib/aws";

const LAMBDA_NAME = process.env.GETMYTEETIME_LAMBDA_NAME || "getmyteetime-x86";

function decodePayload(payloadBytes) {
  if (!payloadBytes) return null;
  const decoded = new TextDecoder().decode(payloadBytes);
  if (!decoded) return null;
  try {
    return JSON.parse(decoded);
  } catch {
    return { raw: decoded };
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const payload = {
      trigger: "dashboard-test",
      profileId: "fairbanks-morning",
      ...(body?.payload || {}),
      confirmSubmit: false,
    };

    const response = await lambdaClient.send(
      new InvokeCommand({
        FunctionName: LAMBDA_NAME,
        InvocationType: "RequestResponse",
        Payload: Buffer.from(JSON.stringify(payload)),
      })
    );

    const lambdaBody = decodePayload(response.Payload);

    return Response.json({
      success: !response.FunctionError,
      statusCode: response.StatusCode,
      functionError: response.FunctionError || null,
      executedVersion: response.ExecutedVersion,
      requestPayload: payload,
      responsePayload: lambdaBody,
    });
  } catch (error) {
    console.error("Failed to invoke GetMyTeeTime Lambda test run:", error);
    return Response.json(
      { error: error.message || "Failed to invoke test run" },
      { status: 500 }
    );
  }
}
