import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-doctor", UserController.createDoctor);

//Todo : implement admin and superAdmin later
// router.post("/create-admin", UserController.createDoctor);
// router.post("/create-super-admin", UserController.createDoctor);

export const UserRoutes = router;
