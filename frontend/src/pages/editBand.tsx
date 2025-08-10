import {
  Button,
  VStack,
  Field,
  Box,
  Card,
  Container,
  Heading,
  Input,
  FieldErrorText,
  Center,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { MemberCombobox } from "@/components/memberCombobox";
import { useNavigate, useParams } from "react-router-dom";
import { getBandById, updateBand } from "@/api";

const schema = z.object({
  name: z
    .string()
    .min(1, "バンド名は必須です")
    .max(256, "256文字以下で入力してください"),
  vocal: z.array(z.string()).max(3, "最大10人までです"),
  guitar: z.array(z.string()).max(10, "最大10人までです"),
  bass: z.array(z.string()).max(10, "最大10人までです"),
  drums: z.array(z.string()).max(10, "最大10人までです"),
  keyboard: z.array(z.string()).max(10, "最大10人までです"),
  other: z.array(z.string()).max(10, "最大10人までです"),
  songs: z.string().max(256, "256文字以下で入力してください"),
  leader: z.string().min(1, "代表者は必須です"),
});

type FormValues = z.infer<typeof schema>;

const parts = [
  "vocal",
  "guitar",
  "bass",
  "drums",
  "keyboard",
  "other",
] as const;
const parts_jp: { [key: string]: string } = {
  vocal: "ボーカル",
  guitar: "ギター",
  bass: "ベース",
  drums: "ドラム",
  keyboard: "キーボード",
  other: "その他のパート",
};

export default function EditBand() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      vocal: [],
      guitar: [],
      bass: [],
      drums: [],
      keyboard: [],
      other: [],
      songs: "",
      leader: "",
    },
  });

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchAndSetData = async () => {
      try {
        const band = await getBandById(id);
        console.log("band info: ", band);
        reset({
          name: band.name ?? "",
          vocal: band.vocal_names ?? [],
          guitar: band.guitar_names ?? [],
          bass: band.bass_names ?? [],
          drums: band.drum_names ?? [],
          keyboard: band.keyboard_names ?? [],
          other: band.other_names ?? [],
          songs: band.song_name ?? "",
          leader: band.leader_name ?? "",
        });
      } catch (err) {
        console.error("バンド情報の取得に失敗しました: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetData();
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (!id) {
        console.error("IDがありません。更新処理を中断します。");
        return;
      }
      await updateBand(id, {
        name: data.name,
        vocal_names: data.vocal,
        guitar_names: data.guitar,
        bass_names: data.bass,
        drum_names: data.drums,
        keyboard_names: data.keyboard,
        other_names: data.other,
        song_name: data.songs,
        leader_name: data.leader,
      });

      alert("バンド登録完了");
      navigate("/bands");
    } catch (err) {
      alert("登録に失敗しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Center h={"100vh"}>
        <Spinner size={"xl"} />
      </Center>
    );
  }

  return (
    <Container maxW={"xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンド編集フォーム
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Root colorPalette={"teal"}>
          <Card.Body>
            <VStack align={"stretch"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>
                      バンド名 <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...field} autoComplete="organization" />
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
                    <Field.Label>曲名</Field.Label>
                    <Input {...field} autoComplete="off" />
                    <FieldErrorText>{errors.songs?.message}</FieldErrorText>
                  </Field.Root>
                )}
              />

              <Controller
                name="leader"
                control={control}
                render={({ field }) => (
                  <Field.Root invalid={!!errors.leader}>
                    <Field.Label>
                      代表者 <Field.RequiredIndicator />
                    </Field.Label>
                    <MemberCombobox
                      multi={false}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                    <FieldErrorText>{errors.leader?.message}</FieldErrorText>
                  </Field.Root>
                )}
              />
            </VStack>

            <HStack mt={4} gap={4}>
              <Button
                variant={"outline"}
                colorScheme={"gray"}
                size={"sm"}
                onClick={() => navigate("/bands")}
                flex={1}
              >
                キャンセル
              </Button>
              <Button
                flex={1}
                type="submit"
                colorScheme={"teal"}
                size={"sm"}
                loading={isSubmitting}
                w={"100%"}
              >
                更新
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      </form>
    </Container>
  );
}
