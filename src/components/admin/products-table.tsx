import { DataTable } from "../ui/data-table";
import { columns, Product } from "./product-columns";
import GlobalPagination from "../global-pagination";
import { getAllProducts } from "@/actions/management/product-actions";

type Props = {
  page?: string;
};

const ProductsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;
  const limit = 10;

  let products: Product[] = [];
  let pagination = { page: 1, limit: 10, total: 0 };

  try {
    const res = await getAllProducts(currentPage, limit)
    if (res.success) {
      products = res.data;
      pagination = res.pagination;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="w-full space-y-4">
      <DataTable columns={columns} data={products} />
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

export default ProductsTable;
