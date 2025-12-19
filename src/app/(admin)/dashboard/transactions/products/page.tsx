import ProductsTransactionsTable from '@/components/admin/product-transactions-table'

const ProductTransactionsPage = () => {
  return (
    <div>
      <div className="p-10">
        <div className="flex justify-between">
          <h1 className="mb-4 text-3xl font-bold">Product Transactions</h1>
        </div>
        <ProductsTransactionsTable />
      </div>
    </div>
  )
}

export default ProductTransactionsPage