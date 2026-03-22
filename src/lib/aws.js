import { LambdaClient } from "@aws-sdk/client-lambda";
import { SchedulerClient } from "@aws-sdk/client-scheduler";
import { SSMClient } from "@aws-sdk/client-ssm";
import { ECSClient } from "@aws-sdk/client-ecs";

const region = process.env.AWS_REGION || "us-west-2";

export const lambdaClient = new LambdaClient({ region });

export const schedulerClient = new SchedulerClient({ region });

export const ssmClient = new SSMClient({ region });

export const ecsClient = new ECSClient({ region });
