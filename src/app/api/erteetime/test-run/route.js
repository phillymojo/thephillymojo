import { RunTaskCommand } from "@aws-sdk/client-ecs";
import { ecsClient } from "@/lib/aws";

const CLUSTER = process.env.ERTEETIME_ECS_CLUSTER || "er-teetime";
const TASK_DEFINITION = process.env.ERTEETIME_ECS_TASK_DEFINITION || "er-teetime";
const SUBNET = process.env.ERTEETIME_ECS_SUBNET || "";
const SECURITY_GROUP = process.env.ERTEETIME_ECS_SECURITY_GROUP || "";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const envOverrides = body?.envOverrides || {};

    const containerOverrides = Object.entries(envOverrides)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(([name, value]) => ({ name, value: String(value) }));

    const params = {
      cluster: CLUSTER,
      taskDefinition: TASK_DEFINITION,
      launchType: "FARGATE",
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [SUBNET],
          securityGroups: [SECURITY_GROUP],
          assignPublicIp: "ENABLED",
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: "er-teetime",
            environment: containerOverrides,
          },
        ],
      },
    };

    const response = await ecsClient.send(new RunTaskCommand(params));

    const task = response.tasks?.[0];
    const failure = response.failures?.[0];

    if (failure) {
      return Response.json({
        success: false,
        error: failure.reason,
        detail: failure.detail,
      });
    }

    return Response.json({
      success: true,
      taskArn: task?.taskArn,
      lastStatus: task?.lastStatus,
      envOverrides,
    });
  } catch (error) {
    console.error("Failed to run ER TeeTime ECS task:", error);
    return Response.json(
      { error: error.message || "Failed to run task" },
      { status: 500 }
    );
  }
}
