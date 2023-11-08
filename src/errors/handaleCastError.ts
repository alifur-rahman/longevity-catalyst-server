import { ValidationError } from "sequelize";
import { IGenericErrorMessage } from "../interfaces/error.interface";

const handaleCastError = (error: ValidationError) => {
  const errors: IGenericErrorMessage[] = error.errors.map(
    (ValidationError) => ({
      path: ValidationError.path ?? "unknown",
      message: ValidationError.message,
    })
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handaleCastError;
