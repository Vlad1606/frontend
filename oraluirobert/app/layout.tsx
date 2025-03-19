import type { Metadata } from "next";
import { Providers } from "./providers"; // ✅ Import the styled-components provider
import StyledComponentsRegistry from "./styledcomponentsregistry"; // ✅ Fixes flickering issue

export const metadata: Metadata = {
  title: "Your App",
  description: "Your App Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry> {/* ✅ Fixes flickering */}
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
