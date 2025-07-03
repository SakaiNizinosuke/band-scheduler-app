import { Flex, Box, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";
import Setting from "./pages/setting";
import { Routes, Route } from "react-router-dom";
import BandRequest from "./pages/bandRequest";
import BandTable from "./pages/bandTable";

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Flex minH="100vh">
        <Box w={"240px"}>
          <Sidebar />
        </Box>

        <Flex flex={1} align={"flex-start"} justify={"center"} p={10}>
          <Box w={"100%"} maxW={"container.sm"}>
            <Routes>
              <Route path="/bands" element={<BandTable />} />
              <Route path="/apply" element={<BandRequest />} />
              <Route path="/staff" element={<Setting />} />
            </Routes>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
