import * as formidable from "formidable";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
      fields?: formidable.Fields;
      files?: formidable.Files;
    }
  }
}
