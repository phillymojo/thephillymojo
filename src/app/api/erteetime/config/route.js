import {
  GetParametersByPathCommand,
  PutParameterCommand,
} from "@aws-sdk/client-ssm";
import { ssmClient } from "@/lib/aws";

const SSM_PREFIX = "/er-teetime/";
const SENSITIVE_PARAMS = new Set([]);
const MASK = "••••••••";

function paramNameToKey(name) {
  return name.replace(SSM_PREFIX, "");
}

export async function GET() {
  try {
    const params = [];
    let nextToken;

    do {
      const response = await ssmClient.send(
        new GetParametersByPathCommand({
          Path: SSM_PREFIX,
          Recursive: false,
          WithDecryption: true,
          ...(nextToken ? { NextToken: nextToken } : {}),
        })
      );
      if (response.Parameters) params.push(...response.Parameters);
      nextToken = response.NextToken;
    } while (nextToken);

    const config = {};
    let lastModified = null;

    for (const param of params) {
      const key = paramNameToKey(param.Name);
      config[key] = SENSITIVE_PARAMS.has(key) ? MASK : param.Value;

      if (param.LastModifiedDate) {
        const ts = new Date(param.LastModifiedDate).getTime();
        if (!lastModified || ts > lastModified) lastModified = ts;
      }
    }

    return Response.json({
      config,
      lastModified: lastModified ? new Date(lastModified).toISOString() : null,
    });
  } catch (error) {
    console.error("Failed to get ER TeeTime config:", error);
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

    // Fetch current values to diff against
    const currentParams = [];
    let nextToken;
    do {
      const response = await ssmClient.send(
        new GetParametersByPathCommand({
          Path: SSM_PREFIX,
          Recursive: false,
          WithDecryption: true,
          ...(nextToken ? { NextToken: nextToken } : {}),
        })
      );
      if (response.Parameters) currentParams.push(...response.Parameters);
      nextToken = response.NextToken;
    } while (nextToken);

    const currentValues = {};
    for (const param of currentParams) {
      currentValues[param.Name.replace(SSM_PREFIX, "")] = param.Value;
    }

    const updates = [];

    for (const [key, value] of Object.entries(config)) {
      if (value === MASK) continue;
      if (SENSITIVE_PARAMS.has(key) && value === "") continue;
      if (value === null || typeof value === "undefined") continue;

      const stringValue = String(value);
      if (currentValues[key] === stringValue) continue;

      updates.push(
        ssmClient.send(
          new PutParameterCommand({
            Name: `${SSM_PREFIX}${key}`,
            Value: stringValue,
            Type: "String",
            Overwrite: true,
          })
        )
      );
    }

    await Promise.all(updates);

    // Merge written values into current to return the definitive state
    for (const [key, value] of Object.entries(config)) {
      if (value === MASK) continue;
      if (SENSITIVE_PARAMS.has(key) && value === "") continue;
      if (value === null || typeof value === "undefined") continue;
      currentValues[key] = String(value);
    }

    return Response.json({ success: true, config: currentValues });
  } catch (error) {
    console.error("Failed to update ER TeeTime config:", error);
    return Response.json(
      { error: error.message || "Failed to update configuration" },
      { status: 500 }
    );
  }
}
