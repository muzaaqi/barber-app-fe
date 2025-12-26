import { getHaircutTransactionById } from "@/actions/management/haircut-transaction-actions";
import { GenerateQRIS } from "@/actions/management/payment-actions"; // Import action Anda
import { HaircutTransactionDetail } from "@/components/transactions/haircut-transaction-detail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HaircutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: transaction } = await getHaircutTransactionById(id);
  if (!transaction) return notFound();
  let qrisString = transaction.qris_payload;
  if (
    transaction.payment_method === "qris" &&
    transaction.payment_status === "unpaid" &&
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
    <div className="container py-6 mx-auto px-5">
      <HaircutTransactionDetail data={detailData} />
    </div>
  );
}
