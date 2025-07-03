import { Box, Container, Heading, Table } from "@chakra-ui/react";

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

type BandItem = {
  id: number;
} & Record<ColumnKey, string>;

const items: BandItem[] = [
  {
    id: 1,
    name: "The Beatles",
    vocal: "John\njohn",
    guitar: "George",
    bass: "Paul",
    drums: "Ringo",
    keyboard: "",
    other: "",
  },
  {
    id: 2,
    name: "Oasis",
    vocal: "Liam",
    guitar: "NoeL",
    bass: "Andy",
    drums: "Chris",
    keyboard: "Gem",
    other: "",
  },
];

export default function BandTable() {
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
