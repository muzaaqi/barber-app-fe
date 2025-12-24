import { DataTable } from "../ui/data-table";
import { columns, Haircut } from "./haircut-columns";
import GlobalPagination from "../global-pagination";
import { getAllHaircuts } from "@/actions/management/haircut-actions";

type Props = {
  page?: string;
};

const HaircutsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;
  const limit = 10;

  let haircuts: Haircut[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await getAllHaircuts(currentPage, limit);
    haircuts = res.data;
    pagination = res.pagination;
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
