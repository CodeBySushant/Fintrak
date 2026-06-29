import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";

// Reads the signed-in user's saved display currency.
// Falls back to USD if signed out, not provisioned yet, or DB is unreachable.
export async function getUserCurrency() {
  try {
    const { userId } = await auth();
    if (!userId) return "USD";

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { currency: true },
    });

    return user?.currency || "USD";
  } catch {
    return "USD";
  }
}