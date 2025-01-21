import About from "@/components/about";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { getBestSellers } from "@/server/db/products";
import Contact from "@/components/contact";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const products = await getBestSellers(3);
  const { title } = await getTrans(locale);

  return (
    <main>
      <h2>{title}</h2>
      <Hero />
      <BestSellers products={products} />
      <About />
      <Contact />
    </main>
  );
}
