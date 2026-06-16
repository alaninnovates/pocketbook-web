import '@mantine/core/styles.css';

import type { Metadata } from "next";
import {Rubik} from "next/font/google";
import {ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme} from '@mantine/core';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PocketBook | Dashboard",
  description: "Drill viewing, simplified",
};

const theme = createTheme({
    fontFamily: "var(--font-rubik), sans-serif"
});

const rubik = Rubik({
  variable: "--font-rubik",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
        <ColorSchemeScript />
    </head>
      <body className={rubik.className}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
