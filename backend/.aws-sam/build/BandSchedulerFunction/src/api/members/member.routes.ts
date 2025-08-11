import { Router } from "express";
import * as memberController from "./member.controller";

const memberRoutes = Router();

memberRoutes.get("/", memberController.getAllMembers);
memberRoutes.post("upload-csv", memberController.uploadMembersCsv);

export { memberRoutes };
