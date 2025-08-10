import { Request, Response, RequestHandler } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});
const TABLE_NAME = "bands";

export const deleteBandHandler: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "IDが指定されていません"});
        return;
    }

    try {
        await dynamo.delete({
            TableName: TABLE_NAME,
            Key: { id },
        }).promise();

        res.status(200).json({ message: "バンド削除成功", id });
    } catch (err: any) {
        console.error("バンド削除失敗", err);
        res.status(500).json({ message: err.message });
    }
}
