import About from "@/components/about";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { getBestSellers } from "@/server/db/products";
import Contact from "@/components/contact";

export default async function Home() {
  const products = await getBestSellers(3);

  return (
    <main>
      <Hero />
      <BestSellers products={products} />
      <About />
      <Contact />
    </main>
  );
}
