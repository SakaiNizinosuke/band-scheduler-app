import {
  Button,
  VStack,
  SimpleGrid,
  Box,
  Card,
  Container,
  Heading,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberField } from "../components/numberField";
import { useState } from "react";
import { FileUploadForm } from "../components/fileUploadForm";
import { sendFormSettingToLambda, uploadCSV } from "@/api";
import type { ResultItem } from "../components/scheduleTable";
import { ScheduleTable } from "../components/scheduleTable";

const schema = z
  .object({
    period_num: z.number().min(1, { message: "1以上を入力してください" }),
    studio_num: z.number().min(1, { message: "1以上を入力してください" }),
    rehearsal_min_num: z
      .number()
      .min(0, { message: "0以上を入力してください" }),
    rehearsal_max_num: z
      .number()
      .min(0, { message: "0以上を入力してください" }),
    file: z
      .custom<File>((val) => val instanceof File, {
        message: "ファイルをアップロードしてください",
      })
      .nullable(),
  })
  .refine((data) => data.rehearsal_min_num <= data.rehearsal_max_num, {
    message: "最大練習回数は最小練習回数以上にしてください",
    path: ["rehearsal_max_num"],
  });

type FormValues = z.infer<typeof schema>;

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultList, setResultList] = useState<ResultItem[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      period_num: 1,
      studio_num: 1,
      rehearsal_min_num: 0,
      rehearsal_max_num: 0,
      file: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const resultList = await sendFormSettingToLambda(data);
      setResultList(resultList);
    } catch (err) {
      console.error("エラー: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW={"6xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンドスケジューラー設定フォーム
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Root colorPalette={"teal"} maxW={"xl"} mx={"auto"}>
          <Card.Body>
            <VStack align="stretch">
              <Box display="flex" justifyContent={"flex-end"} mr={8}>
                <SimpleGrid columns={2} rowGap={5} columnGap={20}>
                  <NumberField
                    control={control}
                    name="period_num"
                    label="時限数"
                    error={errors.period_num}
                    min={1}
                  />
                  <NumberField
                    control={control}
                    name="studio_num"
                    label="スタジオ数"
                    error={errors.studio_num}
                    min={1}
                  />
                  <NumberField
                    control={control}
                    name="rehearsal_min_num"
                    label="最小練習回数"
                    error={errors.rehearsal_min_num}
                    min={0}
                  />
                  <NumberField
                    control={control}
                    name="rehearsal_max_num"
                    label="最大練習回数"
                    error={errors.rehearsal_max_num}
                    min={0}
                  />
                </SimpleGrid>
              </Box>

              <Button
                type="submit"
                colorScheme="teal"
                size="sm"
                mt={4}
                loading={isLoading}
              >
                送信
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </form>
      {resultList.length > 0 && (
        <Box py={8} px={8} mt={2} maxW={"full"} w={"100%"} mx={"auto"}>
          <ScheduleTable results={resultList} />
        </Box>
      )}
    </Container>
  );
}
