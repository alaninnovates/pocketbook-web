"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {
    Alert,
    Button,
    Divider,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import {SiApple, SiDiscord, SiGoogle} from "@icons-pack/react-simple-icons";

type OAuthProvider = "google" | "discord" | "apple";

const oauthProviders: { label: string; provider: OAuthProvider, icon: React.ReactNode }[] = [
    {
        label: "Google",
        provider: "google",
        icon: (
            <SiGoogle size={18}/>
        )
    },
    {
        label: "Discord",
        provider: "discord",
        icon: (
            <SiDiscord size={18}/>
        )
    },
    {
        label: "Apple",
        provider: "apple",
        icon: (
            <SiApple size={18}/>
        )
    },
];

export function LoginForm({className, ...props}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            // Update this route to redirect to an authenticated route. The user already has an active session.
            router.push("/protected");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = async (provider: OAuthProvider) => {
        const supabase = createClient();
        setOauthLoading(provider);
        setError(null);

        try {
            const {error} = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
            setOauthLoading(null);
        }
    };

    return (
        <Paper
            className={className}
            component="section"
            p="xl"
            radius="md"
            withBorder
            w="100%"
            {...props}
        >
            <Stack gap="lg">
                <Stack gap={4}>
                    <Title order={1} size="h2">
                        Login
                    </Title>
                    <Text c="dimmed" size="sm">
                        Enter your email below to login to PocketBook
                    </Text>
                </Stack>
                <form onSubmit={handleLogin}>
                    <Stack gap="md">
                        <TextInput
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="me@example.com"
                            required
                            value={email}
                            disabled={oauthLoading !== null}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                        />
                        <PasswordInput
                            id="password"
                            label="Password"
                            required
                            value={password}
                            disabled={oauthLoading !== null}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                        {error ? (
                            <Alert color="red" variant="light">
                                {error}
                            </Alert>
                        ) : null}
                        <Button
                            fullWidth
                            type="submit"
                            loading={isLoading}
                            disabled={oauthLoading !== null}
                            color="grape"
                        >
                            Login
                        </Button>
                        <Divider label="or continue with social" labelPosition="center"/>
                        <Stack gap="xs">
                            {oauthProviders.map(({icon, label, provider}) => (
                                <Button
                                    key={provider}
                                    fullWidth
                                    type="button"
                                    variant="default"
                                    onClick={() => handleOAuthLogin(provider)}
                                    loading={oauthLoading === provider}
                                    disabled={
                                        isLoading ||
                                        (oauthLoading !== null && oauthLoading !== provider)
                                    }
                                    leftSection={icon}
                                >
                                    Continue with {label}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    );
}
