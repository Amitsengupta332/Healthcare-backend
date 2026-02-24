 
import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      //default values
      // needsPasswordChange: false,
      // role: Role.PATIENT
    },
  });

  if (!data.user) {
    throw new Error("Failed to create user");
  }
  //TODO : Create Patient Profile In Transaction After Sign Up Of Patient In USer Model
  // const patient = await prisma.$transaction( async (tx) => {

  //     await tx.pa
  // })

  return data;
};


export const AuthService = {
    registerPatient,
    // loginUser,
};