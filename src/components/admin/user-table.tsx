import { getAllUsers } from "@/actions/auth/get-profile";
import GlobalPagination from "../global-pagination";
import { DataTable } from "../ui/data-table";
import { columns } from "./user-columns";

const UsersTable = async ({ page }: { page?: string }) => {
  let users: [] = [];
  let pagination = {
    page: Number(page) || 1,
    limit: 10,
    total: 0,
  };

  try {
    const res = await getAllUsers(pagination.page, pagination.limit);

    if (res?.data) {
      users = res.data;
      pagination = res.pagination;
    }

  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={users} />
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

export default UsersTable;
