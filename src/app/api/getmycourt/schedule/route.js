import {
  GetScheduleCommand,
  UpdateScheduleCommand,
} from "@aws-sdk/client-scheduler";
import { schedulerClient } from "@/lib/aws";

const SCHEDULE_NAME = process.env.GETMYCOURT_SCHEDULE_NAME || "getmycourt-schedule";

export async function GET() {
  try {
    const command = new GetScheduleCommand({
      Name: SCHEDULE_NAME,
    });

    const response = await schedulerClient.send(command);

    return Response.json({
      name: response.Name,
      scheduleExpression: response.ScheduleExpression,
      state: response.State,
      description: response.Description,
      timezone: response.ScheduleExpressionTimezone,
    });
  } catch (error) {
    console.error("Failed to get schedule:", error);
    return Response.json(
      { error: error.message || "Failed to get schedule" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { scheduleExpression, state, timezone } = body;

    // First get the current schedule to preserve required fields
    const getCommand = new GetScheduleCommand({
      Name: SCHEDULE_NAME,
    });
    const currentSchedule = await schedulerClient.send(getCommand);

    const updateCommand = new UpdateScheduleCommand({
      Name: SCHEDULE_NAME,
      ScheduleExpression: scheduleExpression || currentSchedule.ScheduleExpression,
      State: state || currentSchedule.State,
      ScheduleExpressionTimezone: timezone || currentSchedule.ScheduleExpressionTimezone,
      FlexibleTimeWindow: currentSchedule.FlexibleTimeWindow,
      Target: currentSchedule.Target,
    });

    await schedulerClient.send(updateCommand);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update schedule:", error);
    return Response.json(
      { error: error.message || "Failed to update schedule" },
      { status: 500 }
    );
  }
}
