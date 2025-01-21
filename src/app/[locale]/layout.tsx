import "./globals.css";
import NavBar from "@/components/website/header/NavBar";
import Footer from "@/components/footer";
import { Languages } from "@/constants/enum";

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
