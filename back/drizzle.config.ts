import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: String(process.env.DB_URL)
    },
} satisfies Config