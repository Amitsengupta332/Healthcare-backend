import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import httpStatus from "http-status";
import { PrescriptionService } from "./prescription.service";

const givePrescription = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const result = await PrescriptionService.givePrescription(user, payload);
  //   const result = await PrescriptionService.givePrescription();
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Prescription created successfully",
    data: result,
  });
});

const myPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await PrescriptionService.myPrescriptions(user);
  //   const result = await PrescriptionService.myPrescriptions();
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Prescription fetched successfully",
    data: result,
  });
});

const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await PrescriptionService.getAllPrescriptions();
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Prescriptions retrieval successfully",
    data: result,
  });
});

const updatePrescription = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const prescriptionId = req.params.id;
  const payload = req.body;
  const result = await PrescriptionService.updatePrescription(
    user,
    prescriptionId as string,
    payload,
  );
  //   const result = await PrescriptionService.updatePrescription(
  //   );

  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Prescription updated successfully",
    data: result,
  });
});

const deletePrescription = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const prescriptionId = req.params.id;
  await PrescriptionService.deletePrescription(user, prescriptionId as string);
  //   await PrescriptionService.deletePrescription();

  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: "Prescription deleted successfully",
  });
});

export const PrescriptionController = {
  givePrescription,
  myPrescriptions,
  getAllPrescriptions,
  updatePrescription,
  deletePrescription,
};
