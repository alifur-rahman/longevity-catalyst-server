// multerHelper.js
import fs from "fs";
import multer from "multer";
import path from "path";
// Configure the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const generateNewName = (prefix: string) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `${prefix}_${timestamp}`;
};

// Custom file handling logic
const handleFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (file) {
        const extention = path.extname(file.originalname);
        const oldPath = file.path;
        const newName = generateNewName("pro_pic");
        const newDir = path.join(__dirname, "uploads");
        const newPath = path.join(newDir, newName + extention);

        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            console.error("Error occurred during file upload:", err);
            reject("Error occurred during file upload");
          } else {
            console.log("File uploaded successfully");
            const imagePath = `/uploads/${newName + extention}`; // Adjust the path as per your project structure
            // Additional logic after file upload
            // Add your custom logic here
            // For example:
            resolve(imagePath);
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

export { handleFileUpload, upload };
