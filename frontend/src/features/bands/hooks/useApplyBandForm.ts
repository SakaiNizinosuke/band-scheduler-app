import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createBand } from "@/api";
import { bandSchema, defaultFormValues } from "../bandFormSettings";
import type { FormValues } from "../bandFormSettings";

const formatFormToApi = (data: FormValues) => ({
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

export const useApplyBandForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(bandSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await createBand(formatFormToApi(data));
      alert("バンド登録完了");
      navigate("/bands");
    } catch (err) {
      alert("登録に失敗しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit: originalHandleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
