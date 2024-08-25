import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as userSchema from "./schema/user";
import * as conversationSchema from "./schema/conversation";
import * as messageSchema from "./schema/message";
import * as userConversationSchema from "./schema/userConversation"


if (!process.env.DB_HOST ||
    !process.env.DB_NAME ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD
) {
    throw new Error("Database credentials missing... ")
}

const pool = new Pool({
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});


const combinedSchemas = {
    ...userSchema,
    ...conversationSchema,
    ...messageSchema,
    ...userConversationSchema
    // Add other schemas here
};
export const db: NodePgDatabase<typeof combinedSchemas> = drizzle(pool, { schema: combinedSchemas })