"use client";

import {createClient} from "@/lib/supabase/client";
import {Menu} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {SignOutIcon} from "@phosphor-icons/react";

export function LogoutMenuItem() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/auth/login");
    };

    return (
        <Menu.Item leftSection={<SignOutIcon size={16} stroke={"1.5"}/>} onClick={logout} disabled={isLoading}>
            Log out
        </Menu.Item>
    );
}
