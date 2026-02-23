import { Specialty } from "../../../../generated/prisma";
import { prisma } from "../../lib/prisma";
 

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  // const specialty = await prisma.specialty.create({
  //   data: payload,
  // });

  const specialty = await prisma.specialty.create({
    data: {
      title: payload.title,
    },
  });

  return specialty;
};

const getAllSpecialties = async (): Promise<Specialty[]> => {

    const specialties = await prisma.specialty.findMany();
    return specialties;
}

const deleteSpecialty = async (id: string): Promise<Specialty> => {
  const specialty = await prisma.specialty.delete({
    where: { id },
  });

  return specialty;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
