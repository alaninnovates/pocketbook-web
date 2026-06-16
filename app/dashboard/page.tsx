"use client"
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {Container, Box, Flex, Card, Text, CardSection, Button, Image} from "@mantine/core";
import {createClient} from "@/lib/supabase/client";
import Link from "next/link";

interface Ensemble {
    id: number;
    name: string;
    icon: string;
    role: 'awaiting_approval' | 'member' | 'admin';
    approved_at: string;
    member_count: number;
}

export default function DashboardPage() {
    const [ensembles, setEnsembles] = useState<undefined | Ensemble[]>();

    useEffect(() => {
        const supabase = createClient();

        (async () => {
            const {data: claims, error: claimsError} = await supabase.auth.getClaims();
            if (claimsError || !claims?.claims) {
                redirect("/auth/login");
            }
            const {data: ensembles, error: ensembleError} = await supabase
                .from('ensemble_memberships')
                .select('ensembles(id,name,icon), role, approved_at')
                .neq('role', 'awaiting_approval')
                .order('approved_at')
                .eq('user_id', claims.claims.sub);

            if (ensembleError || !ensembles.length) {
                console.error("err ensemble:", ensembleError);
                return;
            }

            const ensemblesData: Ensemble[] = [];

            for (const e of ensembles) {
                const {count: memberCount, error: memberCountError} = await supabase
                    .from('ensemble_memberships')
                    .select('user_id', {count: 'exact', head: true})
                    .eq('ensemble_id', e.ensembles.id);

                if (!memberCount || memberCountError) {
                    console.error("err mb cnt:", memberCountError);
                    return;
                }

                ensemblesData.push({
                    id: e.ensembles.id,
                    name: e.ensembles.name,
                    icon: e.ensembles.icon,
                    role: e.role,
                    approved_at: e.approved_at,
                    member_count: memberCount
                });
            }
            setEnsembles(ensemblesData);
        })()
    }, []);

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
                {/*{!ensembles && (*/}
                {/*    <Te*/}
                {/*)}*/}
                {ensembles && ensembles.map(e => (
                    <Card padding="sm" withBorder orientation="horizontal" key={e.id}>
                        <CardSection p="sm">
                            <Image
                                bg="blue"
                                radius="md"
                                p="lg"
                                w="80%"
                                src={e.icon}/>
                        </CardSection>

                        <CardSection p="sm">
                            <Text fz="xl">{e.name}</Text>
                            <Box mt="xs">
                                <Text>{e.member_count}</Text>
                                <Text fz="xs" c="dimmed">
                                    Members
                                </Text>
                            </Box>
                            <Button fullWidth mt="md" component={Link} href={`/dashboard/ensemble/${e.id}`}>
                                Ensemble Shows
                            </Button>
                        </CardSection>
                    </Card>
                ))}
            </Flex>
        </Container>
    );
}
