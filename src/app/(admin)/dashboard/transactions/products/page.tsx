import ProductsTransactionsTable from "@/components/admin/product-transactions-table";
import { Suspense } from "react";

const ProductTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = params.page || "1";

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Transaksi Produk</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsTransactionsTable page={page} />
      </Suspense>
    </div>
  );
};

export default ProductTransactionsPage;
