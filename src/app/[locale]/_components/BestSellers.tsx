import Menu from "@/components/menu";
import MainHeading from "@/components/website/main-heading/MainHeading";
import { ProductWithRelations } from "@/types/product";

type Props = {
  products: ProductWithRelations[];
};

const BestSellers = ({ products }: Props) => {
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"checkOut"} title={"Our Best Sellers"} />
        </div>

        <Menu items={products} />
      </div>
    </section>
  );
};

export default BestSellers;
