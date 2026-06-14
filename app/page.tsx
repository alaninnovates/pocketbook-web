"use client";
import {
    Button,
    Card,
    Center,
    Group,
    Stack,
    Text,
    Title, useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import icon from "./icon.png";

export default function Home() {
    const theme = useMantineTheme();

    return (
        <Center
            mih="100dvh"
            p="md"
            bg="grape.1"
        >
            <Card
                radius="lg"
                padding="xl"
                withBorder
                maw={440}
                w="100%"
            >
                <Stack align="center" gap="lg">
                    <Image
                        src={icon}
                        alt="PocketBook icon"
                        width={64}
                        height={64}
                        style={{ borderRadius: theme.radius.md }}
                    />

                    <Stack align="center" gap={6}>
                        <Title order={1} ta="center">
                            PocketBook Admin
                        </Title>
                        <Text c="dimmed" ta="center" mt={4}>
                            Upload and manage ensemble drill from the web.
                            <br/>
                            Note: You must create an account in the PocketBook app before you can log in here.
                        </Text>
                    </Stack>

                    <Group w="100%" grow>
                        <Button component={Link} href="/auth/login" size="md" color="grape">
                            Go to Login
                        </Button>
                        <Button
                            component="a"
                            href="https://pocketbook.band/"
                            size="md"
                            variant="default"
                        >
                            Download App
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Center>
    );
}
