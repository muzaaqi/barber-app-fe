// components/admin/haircuts-table.tsx
import { api } from "@/lib/axios-instance";
import { DataTable } from "../ui/data-table"; // Import file no 2
import { columns, Haircut } from "./haircut-columns"; // Import file haircut-columns
import GlobalPagination from "../global-pagination";

type Props = {
  page?: string;
};

const HaircutsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;
  const limit = 10;

  let haircuts: Haircut[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await api.get(`/haircuts?page=${currentPage}&limit=${limit}`);
    haircuts = res.data.data.data;
    pagination = res.data.data.pagination;
  } catch (error) {
    console.error("Error fetching haircuts:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={haircuts} />
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

export default HaircutsTable;
