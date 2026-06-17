"use client";
import {Navbar} from "@/components/navbar";
import {UploadVersionModal} from "@/components/modals/upload-version-modal";
import {ModalsProvider} from "@mantine/modals";
import {UploadShowModal} from "@/components/modals/upload-show-modal";

export default function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ModalsProvider modals={{uploadVersion: UploadVersionModal, uploadShow: UploadShowModal}}>
            <div>
                <Navbar/>
                {children}
            </div>
        </ModalsProvider>
    );
}
