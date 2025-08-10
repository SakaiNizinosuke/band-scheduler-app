import { deleteBand, getBands } from "@/api";
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Portal,
  Table,
  useDisclosure,
  Dialog,
  DialogPositioner,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
  const [deleteTargetItem, setDeleteTargetItem] = useState<DisplayItem | null>(
    null
  );
  const { open, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (item: DisplayItem) => {
    navigate(`/edit/${item.id}`);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTargetItem) return;
    setIsDeleting(true);
    try {
      await deleteBand(deleteTargetItem.id);
      setItems((prev) =>
        prev.filter((item) => item.id !== deleteTargetItem.id)
      );
      onClose();
    } catch (err) {
      console.error("削除失敗", err);
      alert("削除に失敗しました");
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  const handleOpenDialog = (item: DisplayItem) => {
    setDeleteTargetItem(item);
    onOpen();
  };

  const handleCloseDialog = () => {
    setDeleteTargetItem(null);
    setIsDeleting(false);
    onClose();
  };

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

  const rows = items.map((item) => (
    <Table.Row key={item.id}>
      {columns.map((col) => (
        <Table.Cell key={col.key} whiteSpace={"pre-line"}>
          {item[col.key]}
        </Table.Cell>
      ))}

      <Table.Cell key={`${item.id}-edit`}>
        <IconButton
          variant={"subtle"}
          aria-label="編集"
          onClick={() => handleEdit(item)}
        >
          <FiEdit />
        </IconButton>
      </Table.Cell>
      <Table.Cell key={`${item.id}-delete`}>
        <IconButton
          variant={"subtle"}
          aria-label="削除"
          onClick={() => handleOpenDialog(item)}
        >
          <FiTrash2 />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Dialog.Root role="alertdialog" open={open}>
        <Portal>
          <Dialog.Backdrop />
          <DialogPositioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>削除確認</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  <Text as={"span"} fontWeight={"bold"}>
                    {deleteTargetItem?.name}
                  </Text>{" "}
                  を本当に削除しますか?
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant={"outline"}
                    ref={cancelRef}
                    onClick={handleCloseDialog}
                  >
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette={"red"}
                  onClick={handleDeleteConfirmed}
                  loading={isDeleting}
                >
                  削除
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild onClick={handleCloseDialog}>
                <CloseButton size={"sm"} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </DialogPositioner>
        </Portal>
      </Dialog.Root>

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
                  <Table.ColumnHeader fontWeight={"bold"} key={col.key}>
                    {col.label}
                  </Table.ColumnHeader>
                ))}
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>{rows}</Table.Body>
          </Table.Root>
        </Box>
      </Container>
    </>
  );
}
