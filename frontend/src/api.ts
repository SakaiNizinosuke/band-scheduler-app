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

export const uploadBand = async (bandData: {
    name: string;
    vocal_names: string[];
    guitar_names: string[];
    bass_names: string[];
    drum_names: string[];
    keyboard_names: string[];
    other_names: string[];
    song_name: string;
    leader_name: string;
}) => {
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