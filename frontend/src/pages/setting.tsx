import { Button, VStack, SimpleGrid, Box, Card, Container, Heading } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberField } from "../components/numberField";
import { useState } from "react";
import { FileUploadForm } from "../components/fileUploadForm";

const schema = z
    .object({
        numberOfPeriods: z.number().min(1, { message: "1以上を入力してください"}),
        numberOfStudios: z.number().min(1, { message: "1以上を入力してください"}),
        minRehearsal: z.number().min(0, { message: "0以上を入力してください"}),
        maxRehearsal: z.number().min(0, { message: "0以上を入力してください"}),
        file: z
            .custom<File>((val) => val instanceof File, {
                message: "ファイルをアップロードしてください",
            })
            .nullable(),
    })
    .refine((data) => data.minRehearsal <= data.maxRehearsal, {
        message: "最大練習回数は最小練習回数以上にしてください",
        path: ["maxRehearsal"],
    })

type FormValues = z.infer<typeof schema>

export default function Setting() {
    const [isLoading, setIsLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            numberOfPeriods: 1,
            numberOfStudios: 1,
            minRehearsal: 0,
            maxRehearsal: 0,
            file: null,
        },
    })

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("送信データ", data)

        const formData = new FormData()
        formData.append("numberOfPeriods", String(data.numberOfPeriods))
        formData.append("numberOfStudios", String(data.numberOfStudios))
        formData.append("minRehearsal", String(data.minRehearsal))
        formData.append("maxRehearsal", String(data.maxRehearsal))
        if (data.file) {
            formData.append("file", data.file)
        }

        setIsLoading(false)
    }

    return (
        <Container maxW={"xl"} py={10}>
            <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
                バンドスケジューラー設定フォーム
            </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Root colorPalette={"teal"}>
                        <Card.Body>
                            <VStack align="stretch">
                                <Box display="flex" justifyContent={"flex-end"} mr={8}>
                                    <SimpleGrid columns={2} rowGap={5} columnGap={9}>
                                        <NumberField
                                        control={control}
                                        name="numberOfPeriods"
                                        label="時限数"
                                        error={errors.numberOfPeriods}
                                        min={1}
                                        />
                                        <NumberField
                                        control={control}
                                        name="numberOfStudios"
                                        label="スタジオ数"
                                        error={errors.numberOfStudios}
                                        min={1}
                                        />
                                        <NumberField
                                        control={control}
                                        name="minRehearsal"
                                        label="最小練習回数"
                                        error={errors.minRehearsal}
                                        min={0}
                                        />
                                        <NumberField
                                        control={control}
                                        name="maxRehearsal"
                                        label="最大練習回数"
                                        error={errors.maxRehearsal}
                                        min={0}
                                        />
                                    </SimpleGrid>
                                </Box>

                                <Box mt={6}>
                                    <Controller
                                        name="file"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <FileUploadForm field={field} error={fieldState.error} />
                                        )}
                                    />
                                </Box>

                                <Button type="submit" colorScheme="teal" size="sm" mt={4} loading={isLoading}>
                                    送信
                                </Button>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </form>
        </Container>
    )
}