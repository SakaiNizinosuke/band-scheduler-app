import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { getBandById, updateBand } from "@/api";
import { bandSchema, defaultFormValues } from "../bandFormSettings";
import type { FormValues } from "../bandFormSettings";

const formatApiToForm = (band: any): FormValues => ({
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

export const useEditBandForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit: originalHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(bandSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!id) {
      navigate("/bands");
      return;
    }
    const fetchAndSetData = async () => {
      setIsLoading(true);
      try {
        const band = await getBandById(id);
        reset(formatApiToForm(band));
      } catch (err) {
        console.error("バンド情報の取得に失敗しました: ", err);
        alert("情報の取得に失敗しました");
        navigate("/bands");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetData();
  }, [id, navigate, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateBand(id, formatFormToApi(data));
      alert("バンド情報を更新しました");
      navigate("/bands");
    } catch (err) {
      alert("更新に失敗しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit: originalHandleSubmit(onSubmit),
    errors,
    isLoading,
    isSubmitting,
    navigate,
  };
};
