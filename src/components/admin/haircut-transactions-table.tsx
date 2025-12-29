import { DataTable } from "../ui/data-table";
import { columns, HaircutTransaction } from "./haircut-transaction-columns";
import GlobalPagination from "../global-pagination";
import { getHaircutTransactions } from "@/actions/management/haircut-transaction-actions";

const HaircutTransactionsTable = async ({ page }: { page?: string }) => {
  let transactions: HaircutTransaction[] = [];
  let pagination = { page: Number(page) || 1, limit: 10, total: 0 };

  try {
    const res = await getHaircutTransactions(pagination.page, pagination.limit);

    if (res?.data) {
      transactions = res.data;
      pagination = res.pagination;
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
