import { createClient } from "redis";

export const redisServer = createClient({
  url: process.env.REDIS_URL
});

export async function connectRegis(): Promise<void> {
  await redisServer.connect();
}

export async function disconnectRegis(): Promise<void> {
  await redisServer.disconnect();
}
