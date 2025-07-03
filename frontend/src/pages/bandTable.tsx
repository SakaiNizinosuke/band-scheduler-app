import { Box, Container, Heading, Table } from "@chakra-ui/react";

const items = [
  {
    id: 1,
    name: "The Beatles",
    vocal: "John\njohn",
    guitar: "George",
    bass: "Paul",
    drums: "Ringo",
    keyboard: "",
  },
  {
    id: 2,
    name: "Oasis",
    vocal: "Liam",
    guitar: "NoeL",
    bass: "Andy",
    drums: "Chris",
    keyboard: "Gem",
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
              <Table.ColumnHeader fontWeight={"bold"}>
                バンド
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                ボーカル
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                ギター
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                ベース
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                ドラム
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                キーボード
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell whiteSpace={"pre-line"}>{item.vocal}</Table.Cell>
                <Table.Cell>{item.guitar}</Table.Cell>
                <Table.Cell>{item.bass}</Table.Cell>
                <Table.Cell>{item.drums}</Table.Cell>
                <Table.Cell>{item.keyboard}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  );
}
