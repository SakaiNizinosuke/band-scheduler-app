import { Table, IconButton, Box, Center, Spinner } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { DisplayBand } from "../hooks/useBands";

const columns = [
  { key: "name", label: "バンド" },
  { key: "vocal", label: "ボーカル" },
  { key: "guitar", label: "ギター" },
  { key: "bass", label: "ベース" },
  { key: "drums", label: "ドラム" },
  { key: "keyboard", label: "キーボード" },
  { key: "other", label: "その他" },
] as const;

interface DisplayBandTableProps {
  bands: DisplayBand[];
  isLoading: boolean;
  onEdit: (band: DisplayBand) => void;
  onDelete: (band: DisplayBand) => void;
}

export const DisplayBandTable = ({
  bands,
  isLoading,
  onEdit,
  onDelete,
}: DisplayBandTableProps) => {
  if (isLoading) {
    return (
      <Center p={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box borderWidth={"1px"} borderRadius={"md"} overflowY={"auto"} w={"100%"}>
      <Table.Root size={"sm"} variant={"outline"} interactive>
        <Table.Header bg={"teal.600"}>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader fontWeight={"bold"} key={col.key}>
                {col.label}
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bands.map((band) => (
            <Table.Row key={band.id}>
              {columns.map((col) => (
                <Table.Cell key={col.key} whiteSpace={"pre-line"}>
                  {band[col.key]}
                </Table.Cell>
              ))}
              <Table.Cell>
                <IconButton
                  variant={"subtle"}
                  aria-label="edit"
                  onClick={() => onEdit(band)}
                >
                  <FiEdit />
                </IconButton>
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  variant={"subtle"}
                  aria-label="delete"
                  onClick={() => onDelete(band)}
                >
                  <FiTrash2 />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
