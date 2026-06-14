import {redirect} from "next/navigation";

import {createClient} from "@/lib/supabase/server";
import {Suspense} from "react";
import {LogoutButton} from "@/components/logout-button";

async function UserDetails() {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getClaims();

    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
    return (
        <div className="protected-page">
            <LogoutButton/>
            <div>
                <div className="notice">
                    <span aria-hidden="true">i</span>
                    This is a protected page that you can only see as an authenticated
                    user
                </div>
            </div>
            <section className="content-section">
                <h2>Your user details</h2>
                <pre className="user-details">
          <Suspense>
            <UserDetails/>
          </Suspense>
        </pre>
            </section>
        </div>
    );
}
