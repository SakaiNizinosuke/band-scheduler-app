import { z } from "zod";

export const bandSchema = z.object({
  name: z.string().min(1, "Name is required").max(256),
  vocal_names: z.array(z.string()),
  guitar_names: z.array(z.string()),
  bass_names: z.array(z.string()),
  drum_names: z.array(z.string()),
  keyboard_names: z.array(z.string()),
  other_names: z.array(z.string()),
  song_name: z.string().max(256).optional(),
  leader_name: z.string().min(1, "Leader name is required"),
});

export type BandBody = z.infer<typeof bandSchema>;
