import Menu from "@/components/menu";
import { getProductsByCategory } from "@/server/db/products";
import React from "react";

const MenuPage = async () => {
  const categories = await getProductsByCategory();
  console.log(categories);
  return (
    <main>
      {categories.map((cat) => {
        return (
          <section key={cat.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-4xl font-bold text-primary italic mb-6">
                {cat.name}
              </h1>
              <Menu items={cat.products} />
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default MenuPage;
