import { Request, Response, RequestHandler } from "express";
import { parse } from "csv-parse/sync";
import * as memberService from "./member.service";

export const getAllMembers: RequestHandler = async (req, res) => {
  try {
    const members = await memberService.getMembers();
    res.status(200).json({ members: members });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error fetching members", error: err.message });
  }
};

export const uploadMembersCsv: RequestHandler = async (req, res) => {
  try {
    const csv = req.body;

    await memberService.uploadMembersCsv(csv);
    res.status(200).json({ message: "CSVをデータベースに保存しました" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
