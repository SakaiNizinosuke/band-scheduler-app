import React from "react";
import ReactDOM from "react-dom/client";
import HookForm from "./HookForm";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";

const App: React.FC = () => {
    return (<ChakraProvider>
        <CSSReset />
        <Box p={4}>
            <HookForm />
        </Box>
    </ChakraProvider>
    );
}

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}