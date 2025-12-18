import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { api } from "@/lib/axios-instance";
import GlobalPagination from "../global-pagination";
import getAuthHeader from "@/features/get-jwt-token";

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
            <TableCell>Nama Customerl</TableCell>
            <TableCell>Model Rambut</TableCell>
            <TableCell>Waktu Reservasi</TableCell>
            <TableCell>Status Reservasi</TableCell>
            <TableCell>Metode Pembayaran</TableCell>
            <TableCell>Status Pembayaran</TableCell>
            <TableCell>Total Harga</TableCell>
            <TableCell>Gambar</TableCell>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{haircut.name}</TableCell>
                <TableCell>{reservation_time}</TableCell>
                <TableCell>{reservation_status}</TableCell>
                <TableCell>{payment_method}</TableCell>
                <TableCell>{payment_status}</TableCell>
                <TableCell>{total_price}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">Lihat Gambar</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                      <Image
                        src={haircut.image_url}
                        alt={haircut.name}
                        width={200}
                        height={200}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
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
