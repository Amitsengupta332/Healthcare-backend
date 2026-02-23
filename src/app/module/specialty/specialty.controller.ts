import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  const payload = req.body;
  const specialty = await specialtyService.createSpecialty(payload);
  res.status(201).json({
    success: true,
    message: "Specialty created successfully",
    data: specialty,
  });
};

export const specialtyController = {
  createSpecialty,
};
