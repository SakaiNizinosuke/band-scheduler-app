import { z } from "zod";

export const bandSchema = z.object({
  name: z
    .string()
    .min(1, "バンド名は必須です")
    .max(256, "256文字以下で入力してください"),
  vocal: z.array(z.string()).max(10, "最大10人までです"),
  guitar: z.array(z.string()).max(10, "最大10人までです"),
  bass: z.array(z.string()).max(10, "最大10人までです"),
  drums: z.array(z.string()).max(10, "最大10人までです"),
  keyboard: z.array(z.string()).max(10, "最大10人までです"),
  other: z.array(z.string()).max(10, "最大10人までです"),
  songs: z.string().max(256, "256文字以下で入力してください"),
  leader: z.string().min(1, "代表者は必須です"),
});

export type FormValues = z.infer<typeof bandSchema>;

export const parts: (keyof Omit<FormValues, "name" | "songs" | "leader">)[] = [
  "vocal",
  "guitar",
  "bass",
  "drums",
  "keyboard",
  "other",
];

export const parts_jp: { [key: string]: string } = {
  vocal: "ボーカル",
  guitar: "ギター",
  bass: "ベース",
  drums: "ドラム",
  keyboard: "キーボード",
  other: "その他のパート",
};

export const defaultFormValues: FormValues = {
  name: "",
  vocal: [],
  guitar: [],
  bass: [],
  drums: [],
  keyboard: [],
  other: [],
  songs: "",
  leader: "",
};
