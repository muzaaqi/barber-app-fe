import AddProduct from '@/components/admin/add-product'
import ProductsTable from '@/components/admin/products-table'

const ProductsDashboard = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <AddProduct />
      </div>
      <ProductsTable />
    </div>
  )
}

export default ProductsDashboard