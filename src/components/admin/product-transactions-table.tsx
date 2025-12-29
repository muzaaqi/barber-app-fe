import { DataTable } from "../ui/data-table";
import { columns, ProductsTransaction } from "./product-transaction-columns";
import GlobalPagination from "../global-pagination";
import { getProductTransactions } from "@/actions/management/product-transaction-actions";

type Props = {
  page?: string;
};

const ProductsTransactionsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;
  const limit = 10;

  let transactions: ProductsTransaction[] = [];
  let pagination = { page: currentPage, limit: limit, total: 0 };

  try {
    const res = await getProductTransactions(currentPage, limit);

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
