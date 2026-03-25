import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://philjgray.ca"),
  title: "Phil's Portfolio",
  description: "See my work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
