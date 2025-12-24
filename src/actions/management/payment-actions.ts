"use server";

import QRCode from "qrcode";

function convertCRC16(str: string) {
  let crc = 0xffff;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  let hex = (crc & 0xffff).toString(16).toUpperCase();
  if (hex.length === 3) hex = "0" + hex;
  return hex;
}

export const GenerateQRIS = async (transactionData: {
  amount: string;
  withFee: boolean;
  feeType: string;
  feeValue: string;
}) => {
  const qris =
    "00020101021126610014COM.GO-JEK.WWW01189360091438945503680210G8945503680303UMI51440014ID.CO.QRIS.WWW0215ID10254175649580303UMI5204723053033605802ID5917BERGAS BARBERSHOP6009PURWOREJO61055417262070703A016304FFC5";
  try {
    const { amount, withFee, feeType, feeValue } = transactionData;
    if (!qris || !amount) {
      return {
        status: "failed",
        error: "Field 'qris' dan 'amount' wajib diisi",
      };
    }
    const base = qris.slice(0, -4);
    const step1 = base.replace("010211", "010212");
    const [part1, part2] = step1.split("5802ID");
    let uang = `54${amount.length.toString().padStart(2, "0")}${amount}`;
    if (withFee) {
      if (feeType === "r") {
        uang += `55020256${feeValue.length.toString().padStart(2, "0")}${feeValue}`;
      } else if (feeType === "p") {
        uang += `55020357${feeValue.length.toString().padStart(2, "0")}${feeValue}`;
      }
    }
    uang += "5802ID";
    let payload = part1 + uang + part2;
    payload += convertCRC16(payload);
    const qrImage = await QRCode.toDataURL(payload);
    return {
      status: "success",
      emv: payload,
      qrImage,
      error: null,
    };
  } catch (err: unknown) {
    return {
      status: "failed",
      emv: null,
      qrImage: null,
      error: (err as Error).message,
    };
  }
};
