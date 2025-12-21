import { api } from "@/lib/axios-instance";
import getAuthHeader from "@/features/get-jwt-token";
import { DataTable } from "../ui/data-table";
import { columns, HaircutTransaction } from "./haircut-transaction-colums";
import GlobalPagination from "../global-pagination";

const HaircutTransactionsTable = async () => {
  const token = await getAuthHeader();
  let transactions: HaircutTransaction[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await api.get("/haircut-transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data?.data) {
      transactions = res.data.data.data;
      pagination = res.data.data.pagination;
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
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

export default HaircutTransactionsTable;
