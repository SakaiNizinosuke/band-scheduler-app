import { useState } from "react";
import { Container, Heading, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendSchedulerSettings } from "@/api";
import { ScheduleTable } from "@/components/scheduleTable";
import type { ResultItem } from "@/components/scheduleTable";
import { SchedulerSettingForm } from "@/features/scheduler/components/schedulerSettingForm";
import {
  schedulerSchema,
  defaultSchedulerValues,
} from "@/features/scheduler/schedulerSettings";
import type { SchedulerFormValues } from "@/features/scheduler/schedulerSettings";

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultList, setResultList] = useState<ResultItem[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchedulerFormValues>({
    resolver: zodResolver(schedulerSchema),
    mode: "onBlur",
    defaultValues: defaultSchedulerValues,
  });

  const handleFormSubmit = async (data: SchedulerFormValues) => {
    setIsLoading(true);
    setResultList([]);
    try {
      const results = await sendSchedulerSettings(data);
      setResultList(results);
    } catch (err) {
      console.error("エラー: ", err);
      alert("スケジュールの作成に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW={"6xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンドスケジューラー設定
      </Heading>

      <SchedulerSettingForm
        control={control}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit(handleFormSubmit)}
      />

      {resultList.length > 0 && (
        <Box mt={10} w={"100%"} mx={"auto"}>
          <Heading size="md" textAlign="center" mb={4}>
            スケジュール結果
          </Heading>
          <ScheduleTable results={resultList} />
        </Box>
      )}
    </Container>
  );
}
