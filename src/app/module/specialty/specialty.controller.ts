import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
 

const createSpecialty = async (req: Request, res: Response) => {
  const payload = req.body;
  const specialty = await SpecialtyService.createSpecialty(payload);
  res.status(201).json({
    success: true,
    message: "Specialty created successfully",
    data: specialty,
  });
};

const getAllSpecialties = async (req: Request, res: Response) => {
  const specialties = await SpecialtyService.getAllSpecialties();
  res.status(200).json({
    success: true,
    message: "Specialties fetched successfully",
    data: specialties,
  });
};

const deleteSpecialty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialtyService.deleteSpecialty(id as string);
  res.status(200).json({
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
};

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
