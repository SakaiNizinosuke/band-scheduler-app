import { ChakraProvider, Container, Heading, defaultSystem} from "@chakra-ui/react";
import UnifiedForm from "./UnifiedForm";
import system from "./theme";

export default function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Container maxW={"xl"} py={10}>
                <Heading size={"lg"} mb={6} textAlign={"center"} fontSize={21}>
                    バンドスケジューラー設定フォーム
                </Heading>
                <UnifiedForm />
            </Container>
        </ChakraProvider>
    )
}