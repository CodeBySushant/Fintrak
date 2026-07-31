import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  // Next.js 15: searchParams is a Promise and must be awaited
  const { edit: editId } = await searchParams;
  const accounts = await getUserAccounts();

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      {/* AddTransactionForm uses useSearchParams(), which requires a
          Suspense boundary or `next build` fails prerendering this page */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#111827" />}
      >
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </Suspense>
    </div>
  );
}
