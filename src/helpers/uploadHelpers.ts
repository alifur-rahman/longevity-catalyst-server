/* eslint-disable @typescript-eslint/no-explicit-any */
// multerHelper.js
import fs from "fs";
import path from "path";
// const upload = multer({ dest: "./public/data/uploads/" });

// const uploadDir = "./public/data/uploads/";

// // Configure the storage for multer
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const generateNewName = (prefix: string) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `${prefix}_${timestamp}`;
};

// Custom file handling logic
const handleFileUpload = (file: any, uploadDir: string | undefined) => {
  let dirtory: string;
  if (uploadDir === undefined) {
    dirtory = "./public/data/uploads/";
  } else {
    dirtory = uploadDir;
  }

  return new Promise((resolve, reject) => {
    try {
      if (file[0] && file[0].filepath) {
        const extension = path.extname(file[0].originalFilename);
        const oldPath = file[0].filepath;
        const newName = generateNewName("pro_pic");
        const newDir = path.join(dirtory);
        const newPath = path.join(newDir, newName + extension);

        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        // Copy the file to the new destination
        fs.copyFile(oldPath, newPath, (err) => {
          if (err) {
            console.error("Error occurred during file copy:", err);
            reject("Error occurred during file upload");
          } else {
            console.log("File copied successfully");
            const imagePath = dirtory + newName + extension;
            // Remove the original file after the copy
            fs.unlink(oldPath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error occurred during file removal:", unlinkErr);
                reject("Error occurred during file upload");
              } else {
                console.log("File removed successfully");
                // Adjust the path as per your project structure
                // Additional logic after file upload
                // Add your custom logic here
                // For example:
                resolve(imagePath);
              }
            });
          }
        });
      } else {
        console.log("No file uploaded");
        // Additional logic when no file is uploaded
        // Add your custom logic here
        // For example:
        reject("No file uploaded");
      }
    } catch (error) {
      console.error("Error occurred during file upload:", error);
      reject("Error occurred during file upload");
    }
  });
};

export { handleFileUpload };
