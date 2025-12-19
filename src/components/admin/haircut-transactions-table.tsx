import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { api } from "@/lib/axios-instance";
import GlobalPagination from "../global-pagination";
import getAuthHeader from "@/features/get-jwt-token";
import { formatIDR } from "@/features/formatter";

type HaircutTransaction = {
  id: string;
  reservation_time: string;
  reservation_status: string;
  payment_method: string;
  payment_status: string;
  total_price: number;
  haircut: {
    name: string;
    image_url: string;
  };
  user: {
    name: string;
    email: string;
    image_url?: string;
  };
};

const HaircutTransactionsTable = async () => {
  const token = await getAuthHeader();
  const res =
    (await api.get("/haircut-transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) || [];
  const transactions: HaircutTransaction[] = res.data.data.data;
  const pagination = res.data.data.pagination;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Model Rambut</TableCell>
            <TableCell>Nama Customer</TableCell>
            <TableCell>Waktu Reservasi</TableCell>
            <TableCell>Status Reservasi</TableCell>
            <TableCell>Metode Pembayaran</TableCell>
            <TableCell>Status Pembayaran</TableCell>
            <TableCell>Total Harga</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(
            (
              {
                id,
                reservation_time,
                reservation_status,
                payment_method,
                payment_status,
                total_price,
                haircut,
                user,
              },
              index,
            ) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="w-fit">
                  <div className="grid w-fit grid-cols-3 items-center gap-4">
                    <Image
                      src={haircut.image_url}
                      alt={haircut.name}
                      width={50}
                      height={50}
                    />
                    <div className="col-span-2">
                      <span>{haircut.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="grid grid-cols-3 w-fit gap-4 items-center">
                    <Image
                      src={user.image_url || "/default_avatar.svg"}
                      alt={user.name}
                      width={45}
                      height={45}
                    />
                    <div className="col-span-2 w-fit">
                      <span>{user.name}</span>
                      <span className="text-muted-foreground block text-sm">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{reservation_time}</TableCell>
                <TableCell>{reservation_status}</TableCell>
                <TableCell>{payment_method}</TableCell>
                <TableCell>{payment_status}</TableCell>
                <TableCell>{formatIDR(total_price)}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <GlobalPagination
        currentPage={pagination.page}
        totalPages={pagination.total}
      />
    </>
  );
};

export default HaircutTransactionsTable;
