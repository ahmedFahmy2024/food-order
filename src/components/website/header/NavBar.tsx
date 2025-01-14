import { Routes } from "@/components/constants/enum";
import Link from "@/components/Link/Link";
import NavbarRoutes from "./NavbarRoutes";

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
      </div>
    </header>
  );
};

export default NavBar;
