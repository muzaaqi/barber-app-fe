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
import { Ellipsis, Trash } from "lucide-react";
import { api } from "@/lib/axios-instance";
import EditHaircut from "./edit-haircut";
import GlobalPagination from "../global-pagination";

type Haircut = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

const HaircutsTable = async () => {
  const res = (await api.get("/haircuts")) || [];
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
            <TableCell>Gambar</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {haircuts.map(({ id, name, description, image_url }, index) => (
            <TableRow key={id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                {description.length > 50
                  ? description.substring(0, 50) + "..."
                  : description}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Lihat Gambar</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <Image
                      src={image_url}
                      alt={name}
                      width={200}
                      height={200}
                    />
                  </PopoverContent>
                </Popover>
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
                    <Button variant="ghost" className="justify-start gap-3">
                      <Trash /> Hapus
                    </Button>
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
