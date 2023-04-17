import "reflect-metadata";
import express, { Express } from "express";
import "express-async-errors";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB, connectRegis, disconnectRegis } from "@/config";

loadEnv();    

import { handleApplicationErrors } from "@/middlewares";
import { analiseRouter, userRouter } from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/analise", analiseRouter)
  .use(userRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    connectRegis();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
    await disconnectRegis();
}

export default app;