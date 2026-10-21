import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL;
console.log("Host de la base:", DATABASE_URL ? new URL(DATABASE_URL).host : "NO DEFINIDA");