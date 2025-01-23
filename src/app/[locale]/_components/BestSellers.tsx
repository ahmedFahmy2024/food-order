import Menu from "@/components/menu";
import MainHeading from "@/components/website/main-heading/MainHeading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSellers } from "@/server/db/products";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(3);
  const locale = await getCurrentLocale();
  const {
    home: { bestSeller },
  } = await getTrans(locale);

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            subTitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
