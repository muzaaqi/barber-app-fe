import { getProductTransactionById } from "@/actions/management/product-transaction-actions";
import { GenerateQRIS } from "@/actions/management/payment-actions";
import { ProductTransactionDetail } from "@/components/transactions/product-transaction-detail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: transaction } = await getProductTransactionById(id);
  if (!transaction) return notFound();
  let qrisString = transaction.qris_payload;
  if (
    transaction.payment_method === "qris" &&
    transaction.payment_status === "pending" &&
    !qrisString
  ) {
    const qrisResult = await GenerateQRIS({
      amount: transaction.total_price.toString(),
      withFee: false,
      feeType: "p",
      feeValue: "0",
    });
    if (qrisResult.status === "success" && qrisResult.emv) {
      qrisString = qrisResult.emv;
    }
  }
  const detailData = {
    ...transaction,
    qris_payload: qrisString,
  };
  return (
    <div className="container mx-auto px-5 py-6">
      <ProductTransactionDetail data={detailData} />
    </div>
  );
}
