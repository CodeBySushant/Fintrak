import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { DEFAULT_CURRENCY } from "@/lib/currencies";

// Reads the signed-in user's saved display currency.
// Falls back to INR (India-first default) if signed out, not provisioned
// yet, or the DB is unreachable.
export async function getUserCurrency() {
  try {
    const { userId } = await auth();
    if (!userId) return DEFAULT_CURRENCY;

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { currency: true },
    });

    return user?.currency || DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}