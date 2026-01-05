"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface PaymentQRISProps {
  qrString: string;
  fileName?: string;
}

export const PaymentQRIS = ({
  qrString,
  fileName = "qris-payment",
}: PaymentQRISProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${fileName}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      toast.success("QR Code berhasil diunduh");
    } else {
      toast.error("Gagal mengunduh QR Code");
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader className="px-0">
          <div className="rounded-lg bg-white p-2 shadow-sm flex items-center justify-center" ref={qrRef}>
            <QRCodeCanvas value={qrString} size={140} level={"H"} marginSize={5} bgColor="white"/>
          </div>
          <p className="text-muted-foreground text-center text-sm">
            Scan QRIS di atas untuk membayar
          </p>
        </CardHeader>
        <CardFooter className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="w-full max-w-[200px]"
          >
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
