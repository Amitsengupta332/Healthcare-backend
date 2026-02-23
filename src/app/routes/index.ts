import { Router } from "express";
import { specialtyRouter } from "../module/specialty/specialty.route";

const router = Router();


router.use("/specialties", specialtyRouter);
export const IndexRoutes = router;