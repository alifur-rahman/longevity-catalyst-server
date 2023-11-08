import { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const uploadDir = "./public/data/uploads/";

// Create the destination directory if it doesn't exist
const createDestinationDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

createDestinationDir(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    const newFileName = generateNewName("uploaded_file", file.originalname);
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const generateNewName = (prefix: string, originalFilename: string) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const ext = path.extname(originalFilename);
  return `${prefix}_${timestamp}${ext}`;
};

const uploadFileMidd = (upType: string, fileName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (upType === "single") {
      upload.single(fileName)(req, res, next);
    } else if (upType === "array") {
      upload.array(fileName)(req, res, next);
    } else if (upType === "fields") {
      // Customize the fields as needed
      const fields = [{ name: fileName }];
      upload.fields(fields)(req, res, next);
    } else if (upType === "none") {
      next();
    } else {
      throw new Error("Invalid upload type");
    }
  };
};

export default uploadFileMidd;
