export const uploadCSV = async (csvFile: File) => {
    const text = await csvFile.text();

    const res = await fetch("http://localhost:3001/upload", {
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