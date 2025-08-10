import { Flex, Box, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Setting from "./pages/setting";
import { Routes, Route } from "react-router-dom";
import ApplyBand from "./pages/applyBand";
import BandTable from "./pages/bandTable";
import EditBand from "./pages/editBand";

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Flex minH="100vh">
        <Box w={"240px"} position={"fixed"}>
          <Sidebar />
        </Box>

        <Box ml={"240px"} flex={1}>
          <Routes>
            <Route path="/bands" element={<BandTable />} />
            <Route path="/apply" element={<ApplyBand />} />
            <Route path="/staff" element={<Setting />} />
            <Route path="/edit/:id" element={<EditBand />} />
          </Routes>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
