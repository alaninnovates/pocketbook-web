"use client"
import {useState} from 'react';
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
import {CaretDownIcon, GearIcon, SignOutIcon} from '@phosphor-icons/react'

const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

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
                                    <Avatar src={user.image} alt="" radius="xl" size={20}/>
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        {user.name}
                                    </Text>
                                    <CaretDownIcon size={12} stroke={"1.5"}/>
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<GearIcon size={16} stroke={"1.5"}/>}>
                                Account settings
                            </Menu.Item>
                            <Menu.Item leftSection={<SignOutIcon size={16} stroke={"1.5"}/>}>Log out</Menu.Item>
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
