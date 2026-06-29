"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isValidCurrency } from "@/lib/currencies";

export async function updateUserCurrency(code) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!isValidCurrency(code)) throw new Error("Invalid currency");

  const user = await db.user.update({
    where: { clerkUserId: userId },
    data: { currency: code },
  });

  // refresh every route so server-rendered amounts pick up the new currency
  revalidatePath("/", "layout");

  return { success: true, currency: user.currency };
}