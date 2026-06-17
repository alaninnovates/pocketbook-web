"use client"
import {
    Container,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuLabel,
    MenuTarget,
    Table,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr,
    UnstyledButton
} from "@mantine/core";
import {CaretLeftIcon, DotsThreeIcon, TrashIcon, UploadSimpleIcon} from "@phosphor-icons/react";

export default function EnsemblePage() {
    return (
        <Container w="100%">
            <UnstyledButton onClick={() => window.history.back()} my="md" display="flex" dir="row" style={{alignItems: "center", gap: 8}}>
                <CaretLeftIcon size={18}/> Back to ensemble
            </UnstyledButton>
            <h1>LAHS</h1>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Show Name</TableTh>
                        <TableTh>Created At</TableTh>
                        <TableTh>Version</TableTh>
                        <TableTh></TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    <TableTr>
                        <TableTd>Hexed</TableTd>
                        <TableTd>2026-05-14</TableTd>
                        <TableTd>2</TableTd>
                        <TableTd>
                            <Menu shadow="md" width={200}>
                                <MenuTarget>
                                    <UnstyledButton>
                                        <DotsThreeIcon size={24}/>
                                    </UnstyledButton>
                                </MenuTarget>

                                <MenuDropdown>
                                    <MenuLabel>Actions</MenuLabel>
                                    <MenuItem leftSection={<UploadSimpleIcon size={14}/>}>
                                        Upload New Version
                                    </MenuItem>
                                    <MenuItem
                                        color="red"
                                        leftSection={<TrashIcon size={14}/>}
                                    >
                                        Delete
                                    </MenuItem>
                                </MenuDropdown>
                            </Menu>
                        </TableTd>
                    </TableTr>
                </TableTbody>
            </Table>
        </Container>
    )
}