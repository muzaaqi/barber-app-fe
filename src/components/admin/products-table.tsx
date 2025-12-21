// components/admin/products-table.tsx

import { api } from "@/lib/axios-instance";
import { DataTable } from "../ui/data-table";
import { columns, Product } from "./product-columns";
import GlobalPagination from "../global-pagination";

type Props = {
  page?: string;
};

const ProductsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;
  const limit = 10;

  let products: Product[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await api.get(`/products?page=${currentPage}&limit=${limit}`);
    if (res?.data?.data) {
        products = res.data.data.data;
        pagination = res.data.data.pagination;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={products} />
      <div className="flex justify-center">
        <GlobalPagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
        />
      </div>
    </div>
  );
};

export default ProductsTable;