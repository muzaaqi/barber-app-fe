import { Suspense } from "react";
import AddProduct from "@/components/admin/add-product";
import ProductsTable from "@/components/admin/products-table";
import { Spinner } from "@/components/ui/spinner";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ProductsDashboard = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams; 
  
  const page = typeof resolvedSearchParams.page === "string" 
    ? resolvedSearchParams.page 
    : "1";
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="mb-4 text-3xl font-bold">Products</h1>
        <AddProduct />
      </div>
      <Suspense
        key={page}
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <ProductsTable page={page} />
      </Suspense>
    </div>
  );
};

export default ProductsDashboard;
