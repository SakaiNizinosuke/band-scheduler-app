import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const BANDS_TABLE_NAME = "bands";
export const MEMBERS_TABLE_NAME = "members";
