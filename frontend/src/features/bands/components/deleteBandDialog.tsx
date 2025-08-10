import {
  Button,
  Dialog,
  DialogPositioner,
  CloseButton,
  Text,
  Portal,
} from "@chakra-ui/react";
import { useRef } from "react";

interface DeleteBandDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  bandName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteBandDialog = ({
  isOpen,
  isDeleting,
  bandName,
  onClose,
  onConfirm,
}: DeleteBandDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!isOpen) return null;

  return (
    <Dialog.Root role="alertdialog" open={isOpen}>
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
                  {bandName}
                </Text>{" "}
                を本当に削除しますか?
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant={"outline"} ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme={"red"}
                onClick={onConfirm}
                loading={isDeleting}
              >
                削除
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size={"sm"} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};
