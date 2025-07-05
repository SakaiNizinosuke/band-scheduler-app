import { Request, Response } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
import { error } from "console";

dotenv.config({ path: path.resolve(__dirname, ".env") })

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});

const TABLE_NAME = "bands";

export const getBandsHandler = async (req: Request, res: Response) => {
    try {
        const result = await dynamo.scan({
            TableName: TABLE_NAME,
        }).promise();

        const items = result.Items || [];

        const filtered = items.map((item) => ({
            id: item.id,
            name: item.name,
            vocal_names: item.vocal_names || [],     
            guitar_names: item.guitar_names || [],     
            bass_names: item.bass_names || [],     
            drum_names: item.drum_names || [],     
            keyboard_names: item.keyboard_names || [],     
            other_names: item.other_names || [],     
        }));

        res.status(200).json(filtered);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "バンド一覧取得エラー" });
    }
};