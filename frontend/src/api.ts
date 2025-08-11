import type { Band, CreateBandDto, SchedulerSettings } from "./types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(
      errorInfo.message || `API request failed with status ${response.status}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const getBands = (): Promise<Band[]> => apiClient("/bands");

export const getBandById = (id: string): Promise<Band> =>
  apiClient(`/bands/${id}`);

export const createBand = (bandData: CreateBandDto): Promise<Band> => {
  return apiClient("/bands", {
    method: "POST",
    body: JSON.stringify(bandData),
  });
};

export const updateBand = (
  id: string,
  bandData: CreateBandDto
): Promise<Band> => {
  return apiClient(`/bands/${id}`, {
    method: "PUT",
    body: JSON.stringify(bandData),
  });
};

export const deleteBand = (id: string): Promise<void> => {
  return apiClient(`/bands/${id}`, {
    method: "DELETE",
  });
};

export const getMembers = async (): Promise<string[]> => {
  const data = await apiClient<{ members: string[] }>("/members");
  return data.members || [];
};

export const sendSchedulerSettings = async (settings: SchedulerSettings) => {
  const LAMBDA_URL = import.meta.env.LAMBDA_URL || "";
  const response = await fetch(LAMBDA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error("Lambdaへの設定送信に失敗しました");
  }

  const data = await response.json();
  return data.result;
};

export const uploadMemberCsv = async (csvFile: File) => {
  const formData = new FormData();
  formData.append("file", csvFile);

  const response = await fetch(`${API_BASE_URL}/members/upload-csv`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("CSVアップロードに失敗しました");
  }
  return response.json();
};
