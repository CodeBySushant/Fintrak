import { seedTransactions } from "@/actions/seed";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Dev-only utility: seeds demo transactions into the SIGNED-IN user's
// default account. Hard-disabled in production and requires auth —
// previously this was a public endpoint writing to hardcoded IDs.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, error: "Not available in production" },
      { status: 404 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Sign in first, then visit /api/seed again" },
      { status: 401 }
    );
  }

  const result = await seedTransactions();
  return NextResponse.json(result);
}
