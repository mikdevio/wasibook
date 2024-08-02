import path from "path";
import { fileURLToPath } from "url";

import * as dotenv from "dotenv";
dotenv.config();

export const { MONGODB_URL, PORT, SECRET_ACCESS_TOKEN } = process.env;

export const FILENAME = fileURLToPath(import.meta.url);

export const DIRNAME = path.dirname(FILENAME);

export const LAYOUTS = path.join(DIRNAME, "views/layouts");

export const REPORTS = path.join(DIRNAME, "views/reports");

export const LAYOUT_MAIN = path.join(LAYOUTS, "main");

export const LAYOUT_DASHBOARD = path.join(LAYOUTS, "dashboard");

export const PUBLIC_DIR = path.join(DIRNAME, "public");

export const CSS_DIR = path.join(PUBLIC_DIR, "css");

export const DEFAULT_PERFILE_IMG = path.join(
  PUBLIC_DIR,
  "assets/img/perfile_default.png"
);

// TODO: Change this way to point of roles groups for permissions
export const ROLES_GROUP = {
  ALL: ["customer", "staff", "admin"],
  ONLY_CUSTOMER: ["customer"],
  STAFF_AND_ADMIN: ["staff", "admin"],
  ONLY_ADMIN: ["admin"],
  ONLY_STAFF: ["staff"],
};

export const SALT_WORK_FACTOR = 10;
