import { Box, Flex, Text, Icon, Spacer, VStack, Link } from "@chakra-ui/react";
import { FiTable, FiUsers, FiEdit } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import type { FlexProps } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "バンド一覧", icon: FiTable, path: "/bands" },
  { name: "バンド申請", icon: FiEdit, path: "/apply" },
  { name: "合宿担当向け", icon: FiUsers, path: "/staff" },
];

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Box
      as={"a"}
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none", outline: "none" }}
    >
      <Flex
        align={"center"}
        p={4}
        mx={4}
        borderEndRadius={"lg"}
        borderStartRadius={"lg"}
        role="group"
        cursor={"pointer"}
        _hover={{
          bg: "teal.600",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize={16}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default function Sidebar() {
  return (
    <Box
      w={"250px"}
      bg={"bg.subtle"}
      p={4}
      position={"fixed"}
      top={0}
      left={0}
      h={"100vh"}
    >
      <Flex direction={"column"} h={"100%"}>
        <Flex
          h={"20"}
          alignItems={"center"}
          mx={"8"}
          justifyContent={"space-between"}
        >
          <Text fontSize={"xl"} fontFamily={"monospace"} fontWeight={"bold"}>
            総合音楽研究会
          </Text>
        </Flex>

        <VStack align={"stretch"} mt={-4} gap={0}>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.path}>
              <Text fontWeight={"bold"}>{link.name}</Text>
            </NavItem>
          ))}
        </VStack>
        <Spacer />
        <ColorModeButton />
      </Flex>
    </Box>
  );
}
