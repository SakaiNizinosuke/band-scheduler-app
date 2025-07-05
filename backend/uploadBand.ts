import { Request, Response } from "express";
import AWS from "aws-sdk"
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") })

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});
const TABLE_NAME = "bands";

export const uploadBandHander = async (req: Request, res: Response) => {
    try {
        const {
            name,
            vocal_names,
            guitar_names,
            bass_names,
            drum_names,
            keyboard_names,
            other_names,
            song_name,
            leader_name,
        } = req.body;

        const band = {
            id: crypto.randomUUID(),
            name,
            vocal_names,
            guitar_names,
            bass_names,
            drum_names,
            keyboard_names,
            other_names,
            song_name,
            leader_name,
            created_at: new Date().toISOString(),
        };

        await dynamo.put({
            TableName: TABLE_NAME,
            Item: band,
        }).promise();

        res.status(200).json({ message: "バンド登録成功", id: band.id });
    } catch (err: any) {
        console.error("バンド登録失敗", err);
        res.status(500).json({ message: err.message})
    }
}