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
import { Ellipsis } from "lucide-react";

type ProductsTransaction = {
  id: string;
  expedition_service: string;
  expedition_status: string;
  payment_method: string;
  payment_status: string;
  total_price: number;
  items: [
    {
      product_name: string;
      product_image: string;
      quantity: number;
      subtotal: number;
    },
  ];
  user: {
    name: string;
    email: string;
  };
};

const ProductsTransactionsTable = async () => {
  const token = await getAuthHeader();
  const res =
    (await api.get("/product-transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) || [];
  const transactions: ProductsTransaction[] = res.data.data.data;
  const pagination = res.data.data.pagination;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Produk</TableCell>
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
                expedition_service,
                expedition_status,
                payment_method,
                payment_status,
                total_price,
                items,
                user,
              },
              index,
            ) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {items.length === 1 ? (
                    <div className="flex items-center">
                      <Image
                        src={items[0].product_image}
                        alt={items[0].product_name}
                        width={50}
                        height={50}
                      />
                      <span className="ml-2">
                        {items[0].product_name} (x{items[0].quantity})
                      </span>
                    </div>
                  ) : (
                    <Popover>
                      <PopoverTrigger className="flex items-center justify-center">
                        <div className="flex items-center">
                          <Image
                            src={items[0].product_image}
                            alt={items[0].product_name}
                            width={50}
                            height={50}
                          />
                          <span className="ml-2">
                            {items[0].product_name} (x{items[0].quantity})
                          </span>
                        </div>
                        <div>
                          <Button variant="secondary" className="ml-2">
                            <Ellipsis />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit">
                        {items.map(
                          ({ product_name, product_image, quantity, subtotal }) => (
                            <div
                              key={product_name}
                              className="grid grid-cols-3 gap-3 items-center"
                            >
                              <Image
                                src={product_image}
                                alt={product_name}
                                width={50}
                                height={50}
                              />
                              <div className="col-span-2 grid">
                                <span className="">
                                  {product_name} (x{quantity})
                                </span>
                                <span className="text-muted-foreground">{subtotal}</span>
                              </div>
                            </div>
                          ),
                        )}
                      </PopoverContent>
                    </Popover>
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{expedition_service}</TableCell>
                <TableCell>{expedition_status}</TableCell>
                <TableCell>{payment_method}</TableCell>
                <TableCell>{payment_status}</TableCell>
                <TableCell>{total_price}</TableCell>
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

export default ProductsTransactionsTable;
