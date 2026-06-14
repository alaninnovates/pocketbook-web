import {Center, Container, Paper, Stack, Text, Title} from "@mantine/core";
import {Suspense} from "react";

async function ErrorContent({
                                searchParams,
                            }: {
    searchParams: Promise<{ error: string }>;
}) {
    const params = await searchParams;

    return (
        <>
            {params?.error ? (
                <Text c="dimmed" size="sm">
                    Code error: {params.error}
                </Text>
            ) : (
                <Text c="dimmed" size="sm">
                    An unspecified error occurred.
                </Text>
            )}
        </>
    );
}

export default function Page({
                                 searchParams,
                             }: {
    searchParams: Promise<{ error: string }>;
}) {
    return (
        <Center mih="100dvh" p="md">
            <Container size={460} w="100%">
                <Paper component="section" p="xl" radius="md" shadow="sm" withBorder>
                    <Stack gap="md">
                        <Title order={1} size="h2">
                            Sorry, something went wrong.
                        </Title>
                        <Suspense>
                            <ErrorContent searchParams={searchParams}/>
                        </Suspense>
                    </Stack>
                </Paper>
            </Container>
        </Center>
    );
}
