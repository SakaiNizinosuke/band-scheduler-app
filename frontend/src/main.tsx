import React from "react";
import ReactDOM from "react-dom/client";
import HookForm from "./HookForm";
import { Provider } from "@/components/ui/provider"
import { Box } from "@chakra-ui/react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const App: React.FC = () => {
    return (
    <Provider>
        <Box p={4}>
            <HookForm />
        </Box>
    </Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
)