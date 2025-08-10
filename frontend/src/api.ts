type BandData = {
  name: string;
  vocal_names: string[];
  guitar_names: string[];
  bass_names: string[];
  drum_names: string[];
  keyboard_names: string[];
  other_names: string[];
  song_name: string;
  leader_name: string;
};

export const uploadCSV = async (csvFile: File) => {
    const text = await csvFile.text();

    const res = await fetch("http://localhost:3001/upload/csv", {
        method: "POST",
        headers: {
            "Content-Type": "text/csv",
        },
        body: text,
    });

    if (!res.ok) {
        throw new Error("CSVアップロードに失敗しました")
    }

    return await res.json();
};

export const uploadBand = async (bandData: BandData) => {
    const res = await fetch("http://localhost:3001/upload/band", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bandData)
    });

    if (!res.ok) {
        throw new Error("バンド登録に失敗しました")
    }
    return await res.json();
}

export const updateBand = async (id: string, bandData: BandData) => {
    const res = await fetch(`http://localhost:3001/update/band/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bandData),
    });

    if (!res.ok) {
        throw new Error("バンド情報の更新に失敗しました");
    }
    return await res.json();
}

export const deleteBand = async (id: string) => {
    const res = await fetch(`http://localhost:3001/delete/band/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("バンド削除に失敗しました");
    }
    return await res.json();
}

export const fetchMembers = async (): Promise<string[]> => {
    const res = await fetch("http://localhost:3001/members");

    if (!res.ok) {
        throw new Error("メンバーの取得に失敗しました")
    }

    const data = await res.json();
    return data.members || [];
}

export type BandItem = {
    id: string;
    name: string;
    vocal_names: string[];
    guitar_names: string[];
    bass_names: string[];
    drum_names: string[];
    keyboard_names: string[];
    other_names: string[];
}

export const getBands = async (): Promise<BandItem []> => {
    const res = await fetch("http://localhost:3001/bands");

    if (!res.ok) {
        throw new Error("バンド一覧の取得に失敗しました")
    }

    return await res.json();
}

export const getBandById = async (id: string) => {
    const res = await fetch(`http://localhost:3001/getBand/${id}`, {
        method: "GET",
    });

    if (!res.ok) {
        throw new Error("バンド情報の取得に失敗しました")
    }

    return await res.json();
}

export const sendFormSettingToLambda = async (formData: {
    period_num: number;
    studio_num: number;
    rehearsal_min_num: number;
    rehearsal_max_num: number;
}) => {
    const res = await fetch("https://s3jl8qwmqa.execute-api.ap-northeast-1.amazonaws.com/BandScheduler", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error("Lambdaへの設定送信に失敗しました");
    }

    const lambdaResponse = await res.json();

    return lambdaResponse.result;
}