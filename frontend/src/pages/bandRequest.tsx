import { Button, VStack, Field, Box, Card, Container, Heading, Combobox, Portal, createListCollection, Wrap, Badge, Input, FieldErrorText, FieldRequiredIndicator } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { resolve } from "path";
import { MemberCombobox } from "@/components/memberCombobox";

const schema = z.object({
    name: z.string().min(1, "バンド名は必須です").max(256, "256文字以下で入力してください"),
    vocal: z.array(z.string()).max(3, "最大10人までです"),
    guitar: z.array(z.string()).max(10, "最大10人までです"),
    bass: z.array(z.string()).max(10, "最大10人までです"),
    drums: z.array(z.string()).max(10, "最大10人までです"),
    keyboard: z.array(z.string()).max(10, "最大10人までです"),
    other: z.array(z.string()).max(10, "最大10人までです"),
    songs: z.string().max(256, "256文字以下で入力してください"),
    leader: z.array(z.string()).min(1, "代表者は必須です")
})

type FormValues = z.infer<typeof schema>

const parts = ["vocal", "guitar", "bass", "drums", "keyboard", "other"] as const
const parts_jp: { [key: string]: string } = {
    vocal: "ボーカル",
    guitar: "ギター",
    bass: "ベース",
    drums: "ドラム",
    keyboard: "キーボード",
    other: "その他のパート",
}
type Part = typeof parts[number]


export default function BandRequest() {
    const [isLoading, setIsLoading] = useState(false)


    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            vocal: [],
            guitar: [],
            bass: [],
            drums: [],
            keyboard: [],
            other: [],
            songs: "",
            leader: []
        }
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        setIsLoading(false)
    }

    return (
        <Container maxW={"xl"} py={10}>
            <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
                バンド申告フォーム
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card.Root colorPalette={"teal"}>
                    <Card.Body>
                        <VStack align={"stretch"}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Field.Root invalid={!!errors.name} required>
                                        <Field.Label>
                                            バンド名 <Field.RequiredIndicator />
                                        </Field.Label>
                                            <Input {...field} value={field.value ?? ""} />
                                        <FieldErrorText>{errors.name?.message}</FieldErrorText>
                                    </Field.Root>
                                )}
                            />

                            {parts.map((part) => (
                                <Box key={part}>
                                    <Controller
                                        key={part}
                                        name={part as keyof FormValues}
                                        control={control}
                                        render={({ field }) => (
                                            <Field.Root invalid={!!errors[part]}>
                                                <Field.Label>
                                                    {parts_jp[part]}（複数人選べます）
                                                </Field.Label>
                                                <MemberCombobox
                                                    multi={true}
                                                    value={field.value ?? []}
                                                    onChange={field.onChange}
                                                />
                                                <FieldErrorText>{errors[part]?.message}</FieldErrorText>
                                            </Field.Root>
                                        )}
                                    />
                                </Box>
                            ))}

                            <Controller
                                name="songs"
                                control={control}
                                render={({ field }) => (
                                    <Field.Root invalid={!!errors.songs}>
                                        <Field.Label>
                                            曲名
                                        </Field.Label>
                                            <Input {...field} value={field.value ?? ""} />
                                        <FieldErrorText>{errors.songs?.message}</FieldErrorText>
                                    </Field.Root>
                                )}
                            />

                            <Controller
                                name="leader"
                                control={control}
                                render={({ field }) => (
                                    <Field.Root invalid={!!errors.leader} required>
                                        <Field.Label>
                                            代表者 <Field.RequiredIndicator />
                                        </Field.Label>
                                        <MemberCombobox
                                            multi={false}
                                            onChange={field.onChange}
                                        />
                                        <FieldErrorText>{errors.leader?.message}</FieldErrorText>
                                    </Field.Root>
                                )}
                            />
                        </VStack>

                        <Button type="submit" colorScheme={"teal"} size={"sm"} mt={4} loading={isLoading}>
                            送信
                        </Button>
                   </Card.Body>
                </Card.Root>
            </form>
        </Container>
    )
}