import {
  GetScheduleCommand,
  UpdateScheduleCommand,
} from "@aws-sdk/client-scheduler";
import { schedulerClient } from "@/lib/aws";

const SCHEDULE_NAME = process.env.ERTEETIME_SCHEDULE_NAME || "er-teetime-booking";
const GROUP_NAME = process.env.ERTEETIME_SCHEDULE_GROUP || undefined;

function scheduleIdentity() {
  return GROUP_NAME ? { Name: SCHEDULE_NAME, GroupName: GROUP_NAME } : { Name: SCHEDULE_NAME };
}

export async function GET() {
  try {
    const response = await schedulerClient.send(new GetScheduleCommand(scheduleIdentity()));

    return Response.json({
      name: response.Name,
      groupName: response.GroupName,
      scheduleExpression: response.ScheduleExpression,
      state: response.State,
      description: response.Description,
      timezone: response.ScheduleExpressionTimezone,
      targetInput: response.Target?.Input,
    });
  } catch (error) {
    console.error("Failed to get ER TeeTime schedule:", error);
    return Response.json(
      { error: error.message || "Failed to get schedule" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { scheduleExpression, state, timezone, targetInput } = body || {};

    const currentSchedule = await schedulerClient.send(new GetScheduleCommand(scheduleIdentity()));

    await schedulerClient.send(
      new UpdateScheduleCommand({
        Name: SCHEDULE_NAME,
        GroupName: currentSchedule.GroupName,
        ScheduleExpression: scheduleExpression || currentSchedule.ScheduleExpression,
        State: state || currentSchedule.State,
        ScheduleExpressionTimezone:
          timezone || currentSchedule.ScheduleExpressionTimezone,
        FlexibleTimeWindow: currentSchedule.FlexibleTimeWindow,
        Target: {
          ...currentSchedule.Target,
          ...(typeof targetInput === "string" && targetInput.length > 0 ? { Input: targetInput } : {}),
        },
        Description: currentSchedule.Description,
        StartDate: currentSchedule.StartDate,
        EndDate: currentSchedule.EndDate,
        KmsKeyArn: currentSchedule.KmsKeyArn,
        ActionAfterCompletion: currentSchedule.ActionAfterCompletion,
      })
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update ER TeeTime schedule:", error);
    return Response.json(
      { error: error.message || "Failed to update schedule" },
      { status: 500 }
    );
  }
}
