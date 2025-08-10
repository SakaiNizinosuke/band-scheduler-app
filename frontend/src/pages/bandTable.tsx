import { useState } from "react";
import { Container, Heading, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBands } from "@/features/bands/hooks/useBands";
import { DisplayBandTable } from "@/features/bands/components/displayBandTable";
import { DeleteBandDialog } from "@/features/bands/components/deleteBandDialog";
import type { DisplayBand } from "@/features/bands/hooks/useBands";

export default function BandTable() {
  const navigate = useNavigate();
  const { bands, isLoading, removeBand } = useBands();

  const { open, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DisplayBand | null>(null);

  const handleEdit = (band: DisplayBand) => {
    navigate(`/edit/${band.id}`);
  };

  const handleOpenDeleteDialog = (band: DisplayBand) => {
    setDeleteTarget(band);
    onOpen();
  };

  const handleCloseDeleteDialog = () => {
    setDeleteTarget(null);
    onClose();
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await removeBand(deleteTarget.id);
      handleCloseDeleteDialog();
    } catch (err) {
      alert("削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DeleteBandDialog
        isOpen={open}
        isDeleting={isDeleting}
        bandName={deleteTarget?.name}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirmed}
      />

      <Container centerContent maxW={"5xl"} py={10}>
        <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
          バンド一覧
        </Heading>
        <DisplayBandTable
          bands={bands}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleOpenDeleteDialog}
        />
      </Container>
    </>
  );
}
