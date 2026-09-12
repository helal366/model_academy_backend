import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "#db-client"; // Automatically maps to client.ts / client.js

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.NEON_DB_POOLED_LINK });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });


// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "#db-client";
// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });
// export { prisma };