"use client";
import {LoginForm} from "@/components/login-form";
import {Center, Container, useMantineTheme} from "@mantine/core";

export default function Page() {
    const theme = useMantineTheme();

    return (
        <Center
            mih="100dvh"
            p="md"
            bg={`linear-gradient(135deg, ${theme.colors.grape[6]}, ${theme.colors.indigo[4]})`}
        >
            <Container size={420} w="100%">
                <LoginForm/>
            </Container>
        </Center>
    );
}
