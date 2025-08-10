export interface Band {
  id: string;
  name: string;
  vocal_names: string[];
  guitar_names: string[];
  bass_names: string[];
  drum_names: string[];
  keyboard_names: string[];
  other_names: string[];
  song_name: string;
  leader_name: string;
}

export type CreateBandDto = Omit<Band, "id">;

export interface SchedulerSettings {
  period_num: number;
  studio_num: number;
  rehearsal_min_num: number;
  rehearsal_max_num: number;
}
