import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma";

const router = Router();

router.post(
  "/create-doctor",
  //     (req: Request, res: Response, next: NextFunction) => {

  //     const parsedResult = createDoctorZodSchema.safeParse(req.body);

  //     if (!parsedResult.success) {
  //         next(parsedResult.error)
  //     }

  //     //sanitizing the data
  //     req.body = parsedResult.data;

  //     next()

  // },

  validateRequest(createDoctorZodSchema),
  UserController.createDoctor,
);

router.post(
  "/create-admin",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  UserController.createAdmin,
);

//Todo : implement admin and superAdmin later
// router.post("/create-admin", UserController.createDoctor);
// router.post("/create-super-admin", UserController.createDoctor);

export const UserRoutes = router;
