import { Router } from "express";
import { bandRoutes } from "./bands/band.routes";
import { memberRoutes } from "./members/member.routes";

const apiRouter = Router();

apiRouter.use("/bands", bandRoutes);
apiRouter.use("/members", memberRoutes);

export { apiRouter };
