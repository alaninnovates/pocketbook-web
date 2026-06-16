// import {redirect} from "next/navigation";
// import {createClient} from "@/lib/supabase/server";
import {Container, Box, Flex, Card, Text, CardSection, Button, Image} from "@mantine/core";

// async function UserDetails() {
//     const supabase = await createClient();
//     const {data, error} = await supabase.auth.getClaims();
//
//     if (error || !data?.claims) {
//         redirect("/auth/login");
//     }
//
//     return JSON.stringify(data.claims, null, 2);
// }

export default function DashboardPage() {
    return (
        <Container w="100%">
            <h1>My Ensembles</h1>
            <Flex
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                <Card padding="sm" withBorder orientation="horizontal">
                    <CardSection px="sm">
                        <Image
                            bg="blue"
                            radius="md"
                            p="lg"
                            w="80%"
                            src={"https://files.slack.com/files-pri/T0266FRGM-F0BA3RJDS31/image.png?pub_secret=5d010e5132"}/>
                    </CardSection>

                    <CardSection px="sm">
                        <Text fz="xl">LAHS MBCG</Text>
                        <Box mt="xs">
                            <Text>6</Text>
                            <Text fz="xs" c="dimmed">
                                Members
                            </Text>
                        </Box>
                        <Button fullWidth mt="md">
                            Ensemble Shows
                        </Button>
                    </CardSection>
                </Card>
            </Flex>
        </Container>
    );
}
