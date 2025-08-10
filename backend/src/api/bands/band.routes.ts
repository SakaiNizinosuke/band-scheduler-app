import { Router } from "express";
import * as bandController from "./band.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { bandSchema } from "./band.schema";

const bandRoutes = Router();

bandRoutes.get("/", bandController.getBands);

bandRoutes.post("/", validateRequest(bandSchema), bandController.createBand);

bandRoutes.get("/:id", bandController.getBandById);

bandRoutes.put("/:id", validateRequest(bandSchema), bandController.updateBand);

bandRoutes.delete("/:id", bandController.deleteBand);

export { bandRoutes };
