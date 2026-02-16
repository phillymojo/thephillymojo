import {
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand,
} from "@aws-sdk/client-lambda";
import { lambdaClient } from "@/lib/aws";

const LAMBDA_NAME = process.env.GETMYTEETIME_LAMBDA_NAME || "getmyteetime-x86";
const MASK = "••••••••";
const SENSITIVE_FIELDS = ["FAIRBANKS_PASSWORD"];
const RESERVED_ENV_KEYS = new Set(["AWS_REGION"]);

export async function GET() {
  try {
    const response = await lambdaClient.send(
      new GetFunctionConfigurationCommand({
        FunctionName: LAMBDA_NAME,
      })
    );
    const envVars = response.Environment?.Variables || {};
    const maskedVars = { ...envVars };

    for (const field of SENSITIVE_FIELDS) {
      if (maskedVars[field]) maskedVars[field] = MASK;
    }

    return Response.json({
      config: maskedVars,
      lastModified: response.LastModified,
    });
  } catch (error) {
    console.error("Failed to get GetMyTeeTime Lambda config:", error);
    return Response.json(
      { error: error.message || "Failed to get configuration" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { config } = body || {};

    if (!config || typeof config !== "object" || Array.isArray(config)) {
      return Response.json({ error: "Invalid config object" }, { status: 400 });
    }

    const currentConfig = await lambdaClient.send(
      new GetFunctionConfigurationCommand({
        FunctionName: LAMBDA_NAME,
      })
    );
    const currentVars = currentConfig.Environment?.Variables || {};
    const newVars = { ...currentVars };

    for (const [key, rawValue] of Object.entries(config)) {
      if (RESERVED_ENV_KEYS.has(key)) continue;
      if (rawValue === MASK) continue;
      if (key === "FAIRBANKS_PASSWORD" && rawValue === "") continue;
      if (rawValue === null || typeof rawValue === "undefined") continue;
      newVars[key] = String(rawValue);
    }

    await lambdaClient.send(
      new UpdateFunctionConfigurationCommand({
        FunctionName: LAMBDA_NAME,
        Environment: {
          Variables: newVars,
        },
      })
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update GetMyTeeTime Lambda config:", error);
    return Response.json(
      { error: error.message || "Failed to update configuration" },
      { status: 500 }
    );
  }
}
