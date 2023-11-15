import { NextFunction, Request, Response } from "express";
import formidable from "formidable";

// Custom middleware function for handling form data
const handleFormidableMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const form = formidable({ multiples: true });
  console.log("jhifsdfas");

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form: ", err);
      res.status(500).send("Error parsing form data.");
      return;
    }

    // Format the fields to remove the array brackets
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formattedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value[0]])
    );
    // Attach the parsed fields and files to the request object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).fields = formattedFields;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).files = files;

    next();
  });
};

export default handleFormidableMiddleware;
