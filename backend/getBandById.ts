import { Request, Response, RequestHandler } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
dotenv.config ({ path: path.resolve(__dirname, ".env")});

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
});

const TABLE_NAME = "bands";

export const getBandByIdHandler: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "IDが指定されていません"});
        return;
    }

    try {
        const result = await dynamo.get({
            TableName: TABLE_NAME,
            Key: { id },
        }).promise();

        if (!result.Item) {
            res.status(404).json({ message: "バンドが見つかりませんでした"});
            return;
        }
        res.status(200).json(result.Item);
    } catch (err: any) {
        console.error("バンド取得失敗", err);
        res.status(500).json({ message: "サーバエラー", error: err.message })
    }
}