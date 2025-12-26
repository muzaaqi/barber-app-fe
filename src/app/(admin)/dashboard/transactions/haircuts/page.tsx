import HaircutTransactionsTable from '@/components/admin/haircut-transactions-table'
import { Suspense } from 'react';

const HaircutTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = params.page || "1";

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Transaksi Haircut</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HaircutTransactionsTable page={page} />
      </Suspense>
    </div>
  );
};

export default HaircutTransactionsPage