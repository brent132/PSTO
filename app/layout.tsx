import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";
import AppShell from "./app-shell";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fund Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              <AppShell>{children}</AppShell>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
