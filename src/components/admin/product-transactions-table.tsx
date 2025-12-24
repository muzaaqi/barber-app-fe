import { DataTable } from "../ui/data-table";
import { columns, ProductsTransaction } from "./product-transaction-columns";
import GlobalPagination from "../global-pagination";
import { getProductTransactions } from "@/actions/management/product-transaction-actions";

const ProductsTransactionsTable = async () => {
  let transactions: ProductsTransaction[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await getProductTransactions(pagination.page, pagination.limit);

    if (res?.data) {
      transactions = res.data;
      pagination = res.pagination;
    }
  } catch (error) {
    console.error("Error fetching product transactions:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={transactions} />
      {pagination && pagination.total > pagination.limit && (
        <div className="flex justify-center">
          <GlobalPagination
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsTransactionsTable;
