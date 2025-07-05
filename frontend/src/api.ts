export const uploadCSV = async (csvFile: File) => {
    const text = await csvFile.text();

    const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        headers: {
            "Content-Type": "text/csv",
        },
        body: text,
    });

    console.log("fetch res.ok", res.ok)
    const data = await res.json();
    console.log("fetch res data:", data)
    return data;
    console.log("fetch res.ok", res.ok)
    if (!res.ok) {
        throw new Error("CSVアップロードに失敗しました")
    }

    return await res.json();
};