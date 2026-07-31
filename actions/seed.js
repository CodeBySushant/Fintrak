"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

const ACCOUNT_ID = "account-id";
const USER_ID = "user-id";

// Categories with their typical amount ranges
const CATEGORIES = {
  // Amounts are in the base currency (INR) — India-realistic ranges.
  INCOME: [
    { name: "salary", range: [45000, 120000] },
    { name: "freelance", range: [8000, 40000] },
    { name: "investments", range: [3000, 20000] },
    { name: "other-income", range: [1000, 8000] },
  ],
  EXPENSE: [
    { name: "housing", range: [10000, 30000] },
    { name: "transportation", range: [1500, 6000] },
    { name: "groceries", range: [3000, 9000] },
    { name: "utilities", range: [1000, 4000] },
    { name: "entertainment", range: [500, 3000] },
    { name: "food", range: [400, 2500] },
    { name: "shopping", range: [1000, 8000] },
    { name: "healthcare", range: [800, 10000] },
    { name: "education", range: [2000, 15000] },
    { name: "travel", range: [4000, 25000] },
  ],
};

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    // Generate 90 days of transactions
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% chance of income, 60% chance of expense
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${
            type === "INCOME" ? "Received" : "Paid for"
          } ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Insert transactions in batches and update account balance
    await db.$transaction(async (tx) => {
      // Clear existing transactions
      await tx.transaction.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });

      // Insert new transactions
      await tx.transaction.createMany({
        data: transactions,
      });

      // Update account balance
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}
