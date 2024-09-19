import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

export function ProductModal(props: any) {
  const { data, setData, type } = props;
  const [name, setName] = useState<any>(null)
  const [price, setPrice] = useState<any>(null)

  // handle adding new product
  const addNewProduct = () => {
    setData([
      ...data,
      {
        id: data?.length + 1,
        image: "",
        name: name,
        status: 'Active',
        price: price,
        createdOn: '2024-04-22 13:12 AM'
      }
    ])
  }

  // handle editing a product
  // const editProduct = (id: number) => {
  //   if (!id) {
  //     return;
  //   }
  //   let product = data.find((prod: any) => prod.id === id)
  //   product.name = name;
  //   product.price = price
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "add" && <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap" >
            Add Product
          </span>
        </Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "add" ? 'Add' : 'Edit'} Product</DialogTitle>
          {type === "edit" && <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter name of the product"
              className="col-span-3"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Price
            </Label>
            <Input
              id="username"
              placeholder="Enter price of the product"
              className="col-span-3"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => addNewProduct()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
