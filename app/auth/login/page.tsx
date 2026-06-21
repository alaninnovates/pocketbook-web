"use client";
import {LoginForm} from "@/components/login-form";
import {Center, Container} from "@mantine/core";

export default function Page() {
    return (
        <Center
            mih="100dvh"
            p="md"
            bg="md3Dark.8"
        >
            <Container size={420} w="100%">
                <LoginForm/>
            </Container>
        </Center>
    );
}
