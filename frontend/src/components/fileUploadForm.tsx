import { Box, FileUpload, Icon } from "@chakra-ui/react";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { LuUpload } from "react-icons/lu";

type Props = {
    field: ControllerRenderProps<any, "file">
    error?: FieldError
}

export const FileUploadForm = ({ field, error }: Props) => {
    return (
        <FileUpload.Root 
            maxW={"xl"}
            alignItems={"stretch"}
            maxFiles={1}
            onFileChange={(details) => {
                const file = details.acceptedFiles[0] ?? null
                field.onChange(file)
            }}
        >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
                <Icon size={"md"} color={"fg.muted"}>
                    <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                    <Box>ファイルをドラッグ＆ドロップ</Box>
                    <Box color={"fg.muted"}>.csv 5MBまで</Box>
                </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
            {error && (
                <Box color={"red.500"} fontSize={"sm"} mt={1}>
                    {error.message}
                </Box>
            )}
        </FileUpload.Root>
    )
}