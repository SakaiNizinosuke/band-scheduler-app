import { getBands } from "@/api";
import { Box, Container, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const columns = [
  { key: "name", label: "バンド" },
  { key: "vocal", label: "ボーカル" },
  { key: "guitar", label: "ギター" },
  { key: "bass", label: "ベース" },
  { key: "drums", label: "ドラム" },
  { key: "keyboard", label: "キーボード" },
  { key: "other", label: "その他" },
] as const;

type ColumnKey = (typeof columns)[number]["key"];

type DisplayItem = {
  id: string;
} & Record<ColumnKey, string>;

export default function BandTable() {
  const [items, setItems] = useState<DisplayItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw = await getBands();
        const formatted = raw.map((band) => ({
          id: band.id,
          name: band.name,
          vocal: band.vocal_names.join("\n"),
          guitar: band.guitar_names.join("\n"),
          bass: band.bass_names.join("\n"),
          drums: band.drum_names.join("\n"),
          keyboard: band.keyboard_names.join("\n"),
          other: band.other_names.join("\n"),
        }));
        setItems(formatted);
      } catch (err) {
        console.error("バンド一覧取得失敗", err);
      }
    };
    fetchData();
  }, []);
  return (
    <Container centerContent maxW={"5xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンド一覧
      </Heading>
      <Box
        borderWidth={"1px"}
        borderRadius={"md"}
        overflowY={"auto"}
        w={"100%"}
      >
        <Table.Root size={"sm"} variant={"outline"} interactive>
          <Table.Header bg={"teal.600"}>
            <Table.Row>
              {columns.map((col) => (
                <Table.ColumnHeader key={col.key} fontWeight={"bold"}>
                  {col.label}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                {columns.map((col) => (
                  <Table.Cell key={col.key} whiteSpace={"pre-line"}>
                    {item[col.key]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
}
