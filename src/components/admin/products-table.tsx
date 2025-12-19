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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { api } from "@/lib/axios-instance";
import EditProduct from "./edit-product";
import GlobalPagination from "../global-pagination";
import DeleteDialog from "../delete-dialog";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

const ProductsTable = async () => {
  const res = (await api.get("/products")) || [];
  const products: Product[] = res.data.data.data;
  const pagination = res.data.data.pagination;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Stok</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(
            ({ id, name, description, price, stock, image_url }, index) => (
              <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="grid w-fit grid-cols-3 items-center gap-4">
                    <Image src={image_url} alt={name} width={50} height={50} />
                    <div className="col-span-2">
                      <span>{name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {description.length > 50
                    ? description.substring(0, 50) + "..."
                    : description}
                </TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{stock}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="grid w-fit">
                      <EditProduct
                        id={id}
                        product_name={name}
                        product_description={description}
                        product_price={price}
                        product_stock={stock}
                        image_url={image_url}
                      />
                      <DeleteDialog id={id} variant="product" />
                    </DropdownMenuContent>
                  </DropdownMenu>
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

export default ProductsTable;
