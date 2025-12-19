// components/admin/haircuts-table.tsx

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Pastikan path import sesuai
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { api } from "@/lib/axios-instance";
import EditHaircut from "./edit-haircut";
import GlobalPagination from "../global-pagination";
import DeleteDialog from "../delete-dialog";

type Haircut = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

type Props = {
  page?: string;
};

const HaircutsTable = async ({ page }: Props) => {
  const currentPage = Number(page) || 1;

  const res = await api.get(`/haircuts?page=${currentPage}`); 

  const haircuts: Haircut[] = res.data.data.data;
  const pagination = res.data.data.pagination;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell>Nama Model</TableCell>
            <TableCell>Deskripsi</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {haircuts.map(({ id, name, description, image_url }, index) => (
            <TableRow key={id}>
              <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
              <TableCell>
                <div className="grid w-fit grid-cols-3 items-center gap-4">
                  <Image
                    src={image_url}
                    alt={name}
                    width={50}
                    height={50}
                  />
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
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="grid w-fit">
                    <EditHaircut
                      id={id}
                      haircut_name={name}
                      haircut_description={description}
                      image_url={image_url}
                    />
                    <DeleteDialog id={id} variant="haircut" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <GlobalPagination
        currentPage={pagination.page}
        totalPages={pagination.total}
      />
    </>
  );
};

export default HaircutsTable;