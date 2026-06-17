"use client";
import {Navbar} from "@/components/navbar";
import {UploadVersionModal} from "@/components/upload-version-modal";
import {ModalsProvider} from "@mantine/modals";

export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ModalsProvider modals={{uploadVersion: UploadVersionModal}}>
            <div>
                <Navbar/>
                {children}
            </div>
        </ModalsProvider>
    );
}
