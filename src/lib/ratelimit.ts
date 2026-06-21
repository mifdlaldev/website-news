import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export const authRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "ratelimit:auth",
  analytics: true,
});

export const apiRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  prefix: "ratelimit:api",
  analytics: true,
});
