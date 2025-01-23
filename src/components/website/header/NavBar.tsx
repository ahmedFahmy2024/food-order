import Link from "@/components/Link/Link";
import NavbarRoutes from "./NavbarRoutes";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const NavBar = async () => {
  const locale = await getCurrentLocale();
  const { logo, navbar } = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link
          className="text-primary font-semibold text-2xl"
          href={`/${locale}`}
        >
          🍕 {logo}
        </Link>
        <NavbarRoutes translations={navbar} />
        <CartButton />
      </div>
    </header>
  );
};

export default NavBar;
