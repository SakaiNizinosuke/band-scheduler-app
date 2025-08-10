import { Button, Card, Container, Heading } from "@chakra-ui/react";
import { BandForm } from "@/features/bands/components/bandForm";
import { useApplyBandForm } from "@/features/bands/hooks/useApplyBandForm";

export default function ApplyBand() {
  const { control, handleSubmit, errors, isSubmitting } = useApplyBandForm();

  return (
    <Container maxW={"xl"} py={10}>
      <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
        バンド申告フォーム
      </Heading>
      <form onSubmit={handleSubmit}>
        <Card.Root colorPalette={"teal"}>
          <Card.Body>
            <BandForm control={control} errors={errors} />
            <Button
              type="submit"
              colorScheme={"teal"}
              size={"sm"}
              mt={6}
              loading={isSubmitting}
              w={"full"}
            >
              送信
            </Button>
          </Card.Body>
        </Card.Root>
      </form>
    </Container>
  );
}
