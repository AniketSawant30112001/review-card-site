import "./globals.css";

export const metadata = {
  title: "Review Card",
  description: "Leave a review, follow us, or say hello.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
