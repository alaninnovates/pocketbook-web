import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';

import type {Metadata} from "next";
import {Rubik} from "next/font/google";
import {ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme} from '@mantine/core';
import {Notifications} from "@mantine/notifications";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "PocketBook | Dashboard",
    description: "Drill viewing, simplified",
};

const theme = createTheme({
    fontFamily: "var(--font-rubik), sans-serif",
    colors: {
        md3Dark: [
            '#f6effe',
            '#e7dbf3',
            '#cdb5e4',
            '#b18cd5',
            '#9969c9',
            '#8b53c2',
            '#8448bf',
            '#713aa8',
            '#663399',
            '#572a85'
        ]
    },
    primaryColor: 'md3Dark',
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
            <ColorSchemeScript/>
        </head>
        <body className={rubik.className}>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Notifications />
            {children}
        </MantineProvider>
        </body>
        </html>
    );
}
