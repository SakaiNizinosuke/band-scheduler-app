import {
  Button,
  Card,
  Container,
  Heading,
  Center,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { BandForm } from "@/features/bands/components/bandForm";
import { useEditBandForm } from "@/features/bands/hooks/useEditBandForm";

export default function EditBand() {
  const { control, handleSubmit, errors, isLoading, isSubmitting, navigate } =
    useEditBandForm();

  // データ取得中はスピナーを表示
  if (isLoading) {
    return (
      <Center h={"100vh"}>
        <Spinner size={"xl"} />
      </Center>
    );
  }

  return (
    <Container maxW={"xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンド編集フォーム
      </Heading>
      <form onSubmit={handleSubmit}>
        <Card.Root colorPalette={"teal"}>
          <Card.Body>
            <BandForm control={control} errors={errors} />
            <HStack mt={6} gap={4}>
              <Button
                variant={"outline"}
                colorScheme={"gray"}
                size={"sm"}
                onClick={() => navigate("/bands")}
                flex={1}
              >
                キャンセル
              </Button>
              <Button
                flex={1}
                type="submit"
                colorScheme={"teal"}
                size={"sm"}
                loading={isSubmitting}
              >
                更新
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>
      </form>
    </Container>
  );
}
