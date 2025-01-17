import { Routes } from "@/constants/enum";
import Link from "@/components/Link/Link";
import NavbarRoutes from "./NavbarRoutes";
import CartButton from "./CartButton";

const NavBar = () => {
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link
          className="text-primary font-semibold text-2xl"
          href={Routes.ROOT}
        >
          🍕 Pizza
        </Link>
        <NavbarRoutes />
        <CartButton />
      </div>
    </header>
  );
};

export default NavBar;
