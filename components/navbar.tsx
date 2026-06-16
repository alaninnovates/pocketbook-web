"use client"
import {useEffect, useState} from 'react';
import {
    Avatar, Box,
    Burger,
    Container,
    Divider,
    Drawer,
    Group,
    Menu,
    ScrollArea,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import icon from "@/app/icon.png";
import Image from "next/image";
import {CaretDownIcon} from '@phosphor-icons/react'
import {LogoutMenuItem} from "@/components/logout-menu-item";
import {createClient} from "@/lib/supabase/client";
import {redirect} from "next/navigation";

function UserDetails() {
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();

    useEffect(() => {
        const supabase = createClient();

        (async () => {
            const {data: claims, error: claimsError} = await supabase.auth.getClaims();
            if (claimsError || !claims?.claims) {
                redirect("/auth/login");
            }

            const {data: profile, error: profileError} = await supabase
                .from("profiles")
                .select("name, avatar_url")
                .eq("id", claims.claims.sub)
                .single();

            if (profileError) {
                console.error("err profile:", profileError);
                return;
            }

            setUserName(profile?.name || "Unknown User");
            setUserImage(profile?.avatar_url || "");
        })()
    }, []);

    return (
        <>
            <Avatar src={userImage} alt="" radius="xl" size={20}/>
            <Text fw={500} size="sm" lh={1} mr={3}>
                {userName}
            </Text>
        </>
    )
}

export const Navbar = () => {
    const theme = useMantineTheme();

    const [opened, {toggle, close}] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [userHovered, setUserHovered] = useState(false);

    const userActive = userMenuOpened || userHovered;

    return (
        <Box
            pt="sm"
            bg="gray.1"
        >
            <Container pb="sm" size="md">
                <Group justify="space-between">
                    <Image
                        src={icon}
                        alt="PocketBook icon"
                        width={32}
                        height={32}
                        style={{borderRadius: theme.radius.md}}
                    />
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="xs"
                        size="sm"
                        aria-label="Toggle navigation"
                    />
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{transition: 'pop-top-right'}}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                visibleFrom="xs"
                                onMouseEnter={() => setUserHovered(true)}
                                onMouseLeave={() => setUserHovered(false)}
                                color="black"
                                bg={userActive ? "white" : undefined}
                                p="xs"
                                bdrs="sm"
                                style={{
                                    transition: 'background-color 100ms ease',
                                }}
                            >
                                <Group gap={7}>
                                    <UserDetails />
                                    <CaretDownIcon size={12} stroke={"1.5"}/>
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <LogoutMenuItem/>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>

            <Drawer
                opened={opened}
                onClose={close}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="xs"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px)" mx="md">
                    <Divider my="sm"/>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
