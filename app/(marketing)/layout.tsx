export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Navbar and Footer are added in the layout-shell phase.
  return <main id="content">{children}</main>;
}
