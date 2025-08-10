import { Request, Response, RequestHandler } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});
const TABLE_NAME = "bands";

export const updateBandHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

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

        if (!id) {
            res.status(400).json({ message: "バンドIDが指定されていません"});
            return;
        }

        const bandToUpdate = {
            id,
            name,
            vocal_names,
            guitar_names,
            bass_names,
            drum_names,
            keyboard_names,
            other_names,
            song_name,
            leader_name,
            updated_at: new Date().toISOString(),
        };

        await dynamo
            .put({
                TableName: TABLE_NAME,
                Item: bandToUpdate,
            })
            .promise();

        res.status(200).json({ message: "バンド情報更新成功", id: id });
    } catch (err: any) {
        console.error("バンド情報更新失敗", err);
        res.status(500).json({ message: err.message });
    }
}