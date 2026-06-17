import {ContextModalProps} from "@mantine/modals";
import {Group, Text} from "@mantine/core";
import {Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject} from "@mantine/dropzone";
import {ImageIcon, UploadSimpleIcon, XIcon} from "@phosphor-icons/react";
import {notifications} from "@mantine/notifications";

// to close: context.closeModal(id)
export const UploadVersionModal = ({
                                       context,
                                       id,
                                       innerProps,
                                   }: ContextModalProps<{ showId: number }>) => (
    <>
        <Dropzone
            onDrop={(files) => {
                console.log('accepted files', files);
                notifications.show({
                    title: 'Default notification',
                    message: 'ok',
                })
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={{
                'text/plain': ['.3da'],
            }}
        >
            <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                <DropzoneAccept>
                    <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)"/>
                </DropzoneAccept>
                <DropzoneReject>
                    <XIcon size={52} color="var(--mantine-color-red-6)"/>
                </DropzoneReject>
                <DropzoneIdle>
                    <ImageIcon size={52} color="var(--mantine-color-dimmed)"/>
                </DropzoneIdle>

                <div>
                    <Text size="xl" inline>
                        Click to select file
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                        Attach a .3da file exported from Pyware. Max file size is 5mb.
                    </Text>
                </div>
            </Group>
        </Dropzone>
    </>
);
