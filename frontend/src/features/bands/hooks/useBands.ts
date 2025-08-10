import { useState, useEffect, useCallback } from "react";
import { getBands, deleteBand } from "@/api";

interface ApiBand {
  id: string;
  name: string;
  vocal_names: string[];
  guitar_names: string[];
  bass_names: string[];
  drum_names: string[];
  keyboard_names: string[];
  other_names: string[];
}
export interface DisplayBand {
  id: string;
  name: string;
  vocal: string;
  guitar: string;
  bass: string;
  drums: string;
  keyboard: string;
  other: string;
}

const formatBandForDisplay = (band: ApiBand): DisplayBand => ({
  id: band.id,
  name: band.name,
  vocal: band.vocal_names.join("\n"),
  guitar: band.guitar_names.join("\n"),
  bass: band.bass_names.join("\n"),
  drums: band.drum_names.join("\n"),
  keyboard: band.keyboard_names.join("\n"),
  other: band.other_names.join("\n"),
});

export const useBands = () => {
  const [bands, setBands] = useState<DisplayBand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBands = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const rawBands = await getBands();
      setBands(rawBands.map(formatBandForDisplay));
    } catch (err) {
      console.error("バンド一覧取得失敗", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch bands"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBands();
  }, [fetchBands]);

  const removeBand = useCallback(async (bandId: string) => {
    try {
      await deleteBand(bandId);
      setBands((prev) => prev.filter((band) => band.id !== bandId));
    } catch (err) {
      console.error("削除失敗", err);
      throw err;
    }
  }, []);

  return { bands, isLoading, error, removeBand };
};
