import arcjet, { tokenBucket } from "@arcjet/next";

// General write-operation limiter (account/transaction creation)
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 operations
      interval: 3600, // per hour
      capacity: 10, // maximum burst capacity
    }),
  ],
});

// Stricter limiter for AI calls (each receipt scan costs Gemini quota).
// Separate bucket so scans don't eat the user's create-transaction budget.
export const ajAI = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 15, // 15 scans
      interval: 3600, // per hour
      capacity: 15,
    }),
  ],
});

export default aj;
