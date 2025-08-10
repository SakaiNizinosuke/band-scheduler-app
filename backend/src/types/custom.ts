import { Request } from "express";
import "multer";

export interface RequestWithFile extends Request {
  file?: Multer.File;
}
