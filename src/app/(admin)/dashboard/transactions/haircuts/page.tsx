import HaircutTransactionsTable from '@/components/admin/haircut-transactions-table'

const HaircutTransactionsPage = () => {
  return (
    <div>
      <div className="p-10">
        <div className="flex justify-between">
          <h1 className="mb-4 text-3xl font-bold">Haircut Transactions</h1>
        </div>
        <HaircutTransactionsTable />
      </div>
    </div>
  )
}

export default HaircutTransactionsPage