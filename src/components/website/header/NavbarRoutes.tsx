"use client";
import { Pages, Routes } from "@/constants/enum";
import Link from "@/components/Link/Link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, XIcon } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  translations: Record<string, string>;
};

const NavbarRoutes = ({ translations }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const { locale } = useParams();

  const links = [
    { id: crypto.randomUUID(), title: translations.menu, href: Routes.MENU },
    { id: crypto.randomUUID(), title: translations.about, href: Routes.ABOUT },
    {
      id: crypto.randomUUID(),
      title: translations.contact,
      href: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.login,
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];

  return (
    <nav className="order-last lg:order-none">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              onClick={() => setOpenMenu(false)}
              href={`/${locale}/${link.href}`}
              className={`hover:text-primary duration-200 transition-colors font-semibold ${
                pathname.startsWith(`/${locale}/${link.href}`)
                  ? "text-primary"
                  : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
        {/* {session.data?.user && (
          <li>
            <Link
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              onClick={() => setOpenMenu(false)}
              className={`${
                pathname.startsWith(
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                )
                  ? "text-primary"
                  : "text-accent"
              } hover:text-primary duration-200 transition-colors font-semibold`}
            >
              {isAdmin
                ? translations.navbar.admin
                : translations.navbar.profile}
            </Link>
          </li>
        )} */}
        <li className="lg:hidden flex flex-col gap-4">
          <div onClick={() => setOpenMenu(false)}>
            {/* <AuthButtons
              translations={translations}
              initialSession={initialSession}
            /> */}
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default NavbarRoutes;
