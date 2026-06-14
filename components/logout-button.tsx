"use client";

import {createClient} from "@/lib/supabase/client";
import {Button} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useState} from "react";

export function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/auth/login");
    };

    return (
        <Button variant="default" onClick={logout} loading={isLoading}>
            Logout
        </Button>
    );
}
