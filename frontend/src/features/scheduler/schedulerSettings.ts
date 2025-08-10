import { z } from "zod";

export const schedulerSchema = z
  .object({
    period_num: z.number().min(1, { message: "1以上を入力してください" }),
    studio_num: z.number().min(1, { message: "1以上を入力してください" }),
    rehearsal_min_num: z
      .number()
      .min(0, { message: "0以上を入力してください" }),
    rehearsal_max_num: z
      .number()
      .min(0, { message: "0以上を入力してください" }),
  })
  .refine((data) => data.rehearsal_min_num <= data.rehearsal_max_num, {
    message: "最大練習回数は最小練習回数以上にしてください",
    path: ["rehearsal_max_num"],
  });

export type SchedulerFormValues = z.infer<typeof schedulerSchema>;

export const defaultSchedulerValues: SchedulerFormValues = {
  period_num: 1,
  studio_num: 1,
  rehearsal_min_num: 0,
  rehearsal_max_num: 0,
};
