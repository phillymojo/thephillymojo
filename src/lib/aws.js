import { LambdaClient } from "@aws-sdk/client-lambda";
import { SchedulerClient } from "@aws-sdk/client-scheduler";

export const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || "us-west-2",
});

export const schedulerClient = new SchedulerClient({
  region: process.env.AWS_REGION || "us-west-2",
});
