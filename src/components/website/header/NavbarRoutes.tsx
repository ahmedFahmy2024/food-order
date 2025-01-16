"use client";
import { Pages, Routes } from "@/constants/enum";
import Link from "@/components/Link/Link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavbarRoutes = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const links = [
    { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
    { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
    { id: crypto.randomUUID(), title: "Contact", href: Routes.CONTACT },
    {
      id: crypto.randomUUID(),
      title: "Login",
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];

  return (
    <nav className="flex flex-1 justify-end">
      <ul className="flex items-center fixed lg:static top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto lg:items-center gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              onClick={() => setOpenMenu(false)}
              href={`/${link.href}`}
              className={`hover:text-primary duration-200 transition-colors font-semibold ${
                pathname.startsWith(`/${link.href}`)
                  ? "text-primary"
                  : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarRoutes;
