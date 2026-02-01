import {
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand,
} from "@aws-sdk/client-lambda";
import { lambdaClient } from "@/lib/aws";

const LAMBDA_NAME = process.env.GETMYCOURT_LAMBDA_NAME || "getmycourt-x86";

// Fields that should be masked in responses
const SENSITIVE_FIELDS = ["PASSWORD"];

export async function GET() {
  try {
    const command = new GetFunctionConfigurationCommand({
      FunctionName: LAMBDA_NAME,
    });

    const response = await lambdaClient.send(command);
    const envVars = response.Environment?.Variables || {};

    // Mask sensitive fields
    const maskedVars = { ...envVars };
    for (const field of SENSITIVE_FIELDS) {
      if (maskedVars[field]) {
        maskedVars[field] = "••••••••";
      }
    }

    return Response.json({
      config: maskedVars,
      lastModified: response.LastModified,
    });
  } catch (error) {
    console.error("Failed to get Lambda config:", error);
    return Response.json(
      { error: error.message || "Failed to get configuration" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { config } = body;

    if (!config || typeof config !== "object") {
      return Response.json(
        { error: "Invalid config object" },
        { status: 400 }
      );
    }

    // Get current config to preserve fields not being updated
    const getCommand = new GetFunctionConfigurationCommand({
      FunctionName: LAMBDA_NAME,
    });
    const currentConfig = await lambdaClient.send(getCommand);
    const currentVars = currentConfig.Environment?.Variables || {};

    // Merge new config with current, skipping masked values
    const newVars = { ...currentVars };
    for (const [key, value] of Object.entries(config)) {
      // Skip if value is the masked placeholder
      if (value === "••••••••") continue;
      newVars[key] = value;
    }

    const updateCommand = new UpdateFunctionConfigurationCommand({
      FunctionName: LAMBDA_NAME,
      Environment: {
        Variables: newVars,
      },
    });

    await lambdaClient.send(updateCommand);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update Lambda config:", error);
    return Response.json(
      { error: error.message || "Failed to update configuration" },
      { status: 500 }
    );
  }
}
