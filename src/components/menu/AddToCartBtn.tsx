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
import { Extra, ProductSize, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { useStore } from "@/store/store";
import { useState } from "react";

const AddToCartBtn = ({ item }: { item: ProductWithRelations }) => {
  const items = useStore((state) => state.items);

  const defaultSize =
    items.find((i) => i.id === item.id)?.size ||
    item.sizes.find((s) => s.name === ProductSize.SMALL);
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);

  const defaultExtras = items.find((i) => i.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;

  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    selectedExtras.forEach((extra) => {
      totalPrice += extra.price;
    });
  }

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
            <PickSize
              sizes={item.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extra">Any extra toppings?</Label>
            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Add to Cart {formatCurrency(totalPrice)}
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
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={size.id === selectedSize.id}
            onClick={() => setSelectedSize(size)}
            id={size.id}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      setSelectedExtras((prev) => prev.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  return extras.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
    >
      <Checkbox
        id={extra.id}
        onClick={() => handleExtra(extra)}
        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
      />
      <Label htmlFor={extra.id}>
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}
