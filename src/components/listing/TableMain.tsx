import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { ProductModal } from "./ProductModal"

const TableMain = (props: any) => {
  const { data, setData } = props;

  const handleDelete = (itemId: any) => {
    setData(data?.filter((item: any) => item.id !== itemId))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead style={{ paddingLeft: '20px' }}>Status</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="hidden md:table-cell">Action</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data?.length > 0 && data?.map((item: any, index: any) =>
          <TableRow key={index}>
            <TableCell className="hidden sm:table-cell">
              {item.img ? <img
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src="/placeholder.svg"
                width="64"
              /> : <div style={{ width: '64px', height: '64px', border: '1px solid lightgray', borderRadius: '8px', background: 'whitesmoke' }}></div>}
            </TableCell>
            <TableCell className="font-medium">
              {item.name}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{item.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              ₹{item.price}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.createdOn}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    className="w-8 h-6 p-1"
                  >
                    <MoreHorizontal />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <ProductModal type="edit" />
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableMain