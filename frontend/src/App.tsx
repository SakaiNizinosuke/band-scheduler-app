import { ChakraProvider, defaultSystem} from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Setting from "./pages/setting";
import { Routes, Route } from "react-router-dom";
import BandRequest from "./pages/bandRequest";

export default function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Setting />} />
                <Route path="/request" element={<BandRequest />} />
            </Routes>
        </ChakraProvider>
    )
}