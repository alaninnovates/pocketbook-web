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
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {createClient} from "@/lib/supabase/client";

export default function EnsemblePage() {
    const {id: ensembleId} = useParams();
    const [ensemble, setEnsemble] = useState<undefined | {
        id: number;
        name: string;
        icon: string;
    }>();
    const [shows, setShows] = useState<{
        id: number;
        name: string;
        created_at: string;
        current_version: number;
    }[]>([]);

    useEffect(() => {
        if (!ensembleId) return;
        const supabase = createClient();

        (async () => {
            // shows(id, ensemble_id, name, tempo_data, dot_data, created_at, versions, current_version)
            // ensembles(id, name, created_at)
            const {data: ensembleData, error: ensembleError} = await supabase
                .from('ensembles')
                .select('*')
                .eq('id', ensembleId)
                .single();
            if (ensembleError || !ensembleData) {
                console.error('err fetching ensemble data:', ensembleError);
                return;
            }
            setEnsemble(ensembleData);

            const {data: showsData, error: showsError} = await supabase
                .from('shows')
                .select('id, name, created_at, current_version')
                .eq('ensemble_id', ensembleId);
            if (showsError || !showsData) {
                console.error('err fetching shows data:', showsError);
                return;
            }
            setShows(showsData);
        })();
    }, [ensembleId]);

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete show',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this show? This action is irreversible.
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
        });

    if (!ensemble) {
        return;
    }

    return (
        <Container w="100%">
            <UnstyledButton onClick={() => window.history.back()} my="md" display="flex" dir="row" style={{alignItems: "center", gap: 8}}>
                <CaretLeftIcon size={18}/> Back to ensembles
            </UnstyledButton>
            <h1>{ensemble.name}</h1>
            <Table>
                <TableThead>
                    <TableTr>
                        <TableTh>Show Name</TableTh>
                        <TableTh>Created At</TableTh>
                        <TableTh>Current Version</TableTh>
                        <TableTh></TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {shows.map(s => (
                        <TableTr key={s.id}>
                            <TableTd>{s.name}</TableTd>
                            <TableTd>{new Date(s.created_at).toLocaleDateString()}</TableTd>
                            <TableTd>{s.current_version}</TableTd>
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
                    ))}
                </TableTbody>
            </Table>
        </Container>
    )
}