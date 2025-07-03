import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Setting from "./pages/setting";
import { Routes, Route } from "react-router-dom";
import BandRequest from "./pages/bandRequest";

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Sidebar />
      <Routes>
        <Route path="/bands" element={<BandRequest />} />
        <Route path="/apply" element={<BandRequest />} />
        <Route path="/staff" element={<Setting />} />
      </Routes>
    </ChakraProvider>
  );
}
