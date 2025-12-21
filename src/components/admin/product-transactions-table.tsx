import { api } from "@/lib/axios-instance";
import getAuthHeader from "@/features/get-jwt-token";
import { DataTable } from "../ui/data-table";
import { columns, ProductsTransaction } from "./product-transaction-columns";
import GlobalPagination from "../global-pagination";

const ProductsTransactionsTable = async () => {
  const token = await getAuthHeader();
  
  let transactions: ProductsTransaction[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await api.get("/product-transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data?.data) {
        transactions = res.data.data.data;
        pagination = res.data.data.pagination;
    }
  } catch (error) {
    console.error("Error fetching product transactions:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={transactions} />
      <div className="flex justify-center">
        <GlobalPagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
        />
      </div>
    </div>
  );
};

export default ProductsTransactionsTable;