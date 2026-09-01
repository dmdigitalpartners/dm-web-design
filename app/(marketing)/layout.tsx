import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main id="content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
