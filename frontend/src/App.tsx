import { ChakraProvider, defaultSystem} from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Setting from "./pages/setting";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Setting />} />
            </Routes>
        </ChakraProvider>
    )
}