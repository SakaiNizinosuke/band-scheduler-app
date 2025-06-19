import { Button, VStack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberField } from "./NumberField";
import { useState } from "react";
import { FileUploadForm } from "./FileUploadForm";

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

export default function UnifiedForm() {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch">
                <NumberField
                control={control}
                name="numberOfPeriods"
                label="時限数を入力してください"
                error={errors.numberOfPeriods}
                min={1}
                />
                <NumberField
                control={control}
                name="numberOfStudios"
                label="スタジオ数を入力してください"
                error={errors.numberOfStudios}
                min={1}
                />
                <NumberField
                control={control}
                name="minRehearsal"
                label="最小練習回数を入力してください"
                error={errors.minRehearsal}
                min={0}
                />
                <NumberField
                control={control}
                name="maxRehearsal"
                label="最大練習回数を入力してください"
                error={errors.maxRehearsal}
                min={0}
                />

                <Controller
                    name="file"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FileUploadForm field={field} error={fieldState.error} />
                    )}
                />
                <Button type="submit" colorScheme="teal" size="sm" mt={4} loading={isLoading}>
                    送信
                </Button>
            </VStack>
        </form>
    )
}