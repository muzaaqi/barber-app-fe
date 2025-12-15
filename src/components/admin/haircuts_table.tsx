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

const HaircutsTable = () => {
  const haircuts = [
    {
      id: 1,
      name: "French Crop",
      description:
        "A stylish short haircut with a textured top and faded sides.",
      image_url: "/models/french-crop.png",
    },
    {
      id: 2,
      name: "Buzz Cut",
      description: "A very short haircut achieved with electric clippers.",
      image_url: "/models/buzz-cut.png",
    },
  ];
  return (
    <div>
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
              <TableCell>{description}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">View Image</Button>
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
                  <DropdownMenuContent>
                    <Button variant="ghost" className="w-full">Edit</Button>
                    <Button variant="ghost" className="w-full text-destructive">
                      Delete
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HaircutsTable;
