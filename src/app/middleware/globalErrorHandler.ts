import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error!";

  //Zod Error Patttern
  /*
     error.issues; 
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' , 'password' ], => username password
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] 
    */
  // if (err instanceof z.ZodError) {
  //   const simplifiedError = handleZodError(err);
  //   statusCode = status.BAD_REQUEST;
  //   message = "Zod Validation Error!";

  //   err.issues.forEach((issue) => {
  //     errorSources.push({
  //       // path: issue.path.join(".") || "unknown",
  //       path: issue.path.join("."),
  //       // path: issue.path.length > 1 ? issue.path.join(".") : issue.path[0].toString(),
  //       message: issue.message,
  //     });
  //   });
  // }

      if (err instanceof z.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode as number
        message = simplifiedError.message
        errorSources = [...simplifiedError.errorSources]
        // stack = err.stack;

    } 
    // else if (err instanceof AppError) {
    //     statusCode = err.statusCode;
    //     message = err.message;
    //     stack = err.stack;
    //     errorSources = [
    //         {
    //             path: '',
    //             message: err.message
    //         }
    //     ]
    // }
    // else if (err instanceof Error) {
    //     statusCode = status.INTERNAL_SERVER_ERROR;
    //     message = err.message
    //     stack = err.stack;
    //     errorSources = [
    //         {
    //             path: '',
    //             message: err.message
    //         }
    //     ]
    // }


  const errorResponse: TErrorResponse = {
    success: false,
    message: message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? err : undefined,
    // stack: envVars.NODE_ENV === 'development' ? stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
  // res.status(statusCode).json({
  //   success: false,
  //   message: message,
  //   errorSources,
  //   // error: err.message,
  //   error: envVars.NODE_ENV === "development" ? err : undefined,
  // });
};
