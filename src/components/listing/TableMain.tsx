import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Cross, MoreHorizontal, SaveIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

const TableMain = (props: any) => {
  const { data, setData } = props;
  const [nameObj, setNameObj] = useState<any>({})
  const [priceObj, setPriceObj] = useState<any>({})

  useEffect(() => {
    let newNameObj: any = {}
    let newPriceObj: any = {}
    data?.forEach((item: any) => {
      newNameObj[item.id] = item.name
      newPriceObj[item.id] = item.price
    })
    setNameObj(newNameObj)
    setPriceObj(newPriceObj)
  }, [data])

  console.log(nameObj, priceObj)

  const handleDelete = (itemId: any) => {
    setData(data?.filter((item: any) => item.id !== itemId))
  }

  const handleEdit = (itemId: any) => {
    let selectedData = data?.map((item: any) => item.id === itemId ? { ...item, isEdit: true } : { ...item, isEdit: false })
    setData(selectedData)
  }

  const handleCancel = () => {
    let selectedData = data?.map((item: any) => ({ ...item, isEdit: false }))
    setData(selectedData)
  }

  const handleSave = () => {    
    // Save api call

    let selectedData = data?.map((item: any) => {
      if (item.isEdit) {
        return {
          ...item,
          name: nameObj[item.id] || item.name,
          price: priceObj[item.id] || item.price,
          isEdit: false
        }
      }
      return item
    })
    setData(selectedData)
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
              {item.isEdit ?
                <Input
                  value={nameObj[item.id] || ''}
                  onChange={(e) => setNameObj({ ...nameObj, [item.id]: e.target.value })}
                /> : item.name
              }
            </TableCell>
            <TableCell>
              <Badge variant="outline">{item.status}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.isEdit ?
                <Input
                  value={priceObj[item.id] || ''}
                  onChange={(e) => setPriceObj({ ...priceObj, [item.id]: e.target.value })}
                /> : `₹${item.price}`
              }
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.createdOn}
            </TableCell>
            <TableCell>
              {item.isEdit ? (
                <div className="flex gap-2">
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    className="w-10 h-8 p-1"
                    onClick={handleSave}
                  >
                    <SaveIcon />
                  </Button>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    className="w-10 h-8 p-1"
                    onClick={handleCancel}
                  >
                    <Cross1Icon />
                  </Button>
                </div>
              ) : (
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
                    <DropdownMenuItem onClick={() => handleEdit(item.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableMain