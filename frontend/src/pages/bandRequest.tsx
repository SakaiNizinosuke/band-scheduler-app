import { Button, VStack, SimpleGrid, Box, Card, Container, Heading, Combobox, Portal, createListCollection, Wrap, Badge } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { resolve } from "path";
import { MemberCombobox } from "@/components/memberCombobox";

const schema = z.object({
    vocal: z.string().optional(),
    guitar: z.string().optional(),
    bass: z.string().optional(),
    drums: z.string().optional(),
    other: z.string().optional(),
    songs: z.string().max(256, "256文字以下で入力してください").optional(),
    leader: z.string().min(1, "代表者は必須です")
})

type FormValues = z.infer<typeof schema>

export default function BandRequest() {
    const [isLoading, setIsLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        setIsLoading(false)
    }

    const [searchValue, setSearchValue] = useState("")
    const [selectedMembers, setSelectedMembers] = useState<string[]>([])

    return (
        <Container maxW={"xl"} py={10}>
            <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
                バンド申告フォーム
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card.Root colorPalette={"teal"}>
                    <Card.Body>
                        <MemberCombobox
                            part="ボーカル"
                            multi={true}
                            selectedMembers={selectedMembers}
                            onChange={setSelectedMembers}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />
                    </Card.Body>
                </Card.Root>
            </form>
        </Container>
    )
}