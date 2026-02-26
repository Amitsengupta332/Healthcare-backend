import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma";

const router = Router();

router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyController.createSpecialty,
);
router.get("/", SpecialtyController.getAllSpecialties);
router.delete("/:id", SpecialtyController.deleteSpecialty);

export const SpecialtyRouter = router;
