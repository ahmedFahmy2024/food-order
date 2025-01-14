"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "@/components/ui/checkbox";

import Image from "next/image";
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";

const AddToCartBtn = ({ item }: { item: ProductWithRelations }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="mt-4 text-white rounded-full px-8"
        >
          Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center gap-4">
          <Image src={item.image} alt="pizza" width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.description} </DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label htmlFor="pick-size">Pick your size</Label>
            <PickSize sizes={item.sizes} item={item} />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extra">Any extra toppings?</Label>
            <Extras extras={item.extras} item={item} />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartBtn;

function PickSize({
  sizes,
  item,
}: {
  sizes: Size[];
  item: ProductWithRelations;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value={size.name} id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({ extras }: { extras: Extra[]; item: ProductWithRelations }) {
  return extras.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
    >
      <Checkbox id={extra.id} />
      <Label htmlFor={extra.id}>
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}
