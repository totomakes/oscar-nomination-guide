import "./globals.css";
export const metadata = { title: "The Oscar Nomination Scorecard", description: "A granular, scored guide to maximizing your odds of an Academy Award nomination." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
