"use client"
import {
    Text,
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
import {modals} from "@mantine/modals";

export default function EnsemblePage() {
    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete show',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this show? This action is irreversable.
                </Text>
            ),
            labels: { confirm: 'Delete show', cancel: "No, don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => console.log('Confirmed'),
        });

    const openUploadVersionModal = () =>
        modals.openContextModal({
            modal: 'uploadVersion',
            title: 'Upload New Version',
            innerProps: {
                showId: 1
            },
            size: "lg"
        })

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
                                    <MenuItem
                                        leftSection={<UploadSimpleIcon size={14}/>}
                                        onClick={openUploadVersionModal}
                                    >
                                        Upload New Version
                                    </MenuItem>
                                    <MenuItem
                                        color="red"
                                        leftSection={<TrashIcon size={14}/>}
                                        onClick={openDeleteModal}
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