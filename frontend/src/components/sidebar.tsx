import { Box, Flex, VStack, Link, Text, Icon } from "@chakra-ui/react"
import { FiTable, FiUsers, FiEdit } from "react-icons/fi"
import type { IconType } from "react-icons/lib"
import type { FlexProps } from "@chakra-ui/react"

interface LinkItemProps {
    name: string
    icon: IconType
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}
const LinkItems: Array<LinkItemProps> = [
    {name: "バンド一覧", icon: FiTable },
    {name: "バンド申請", icon: FiEdit },
    {name: "合宿担当向け", icon: FiUsers },
]

const NavItem = ({ icon, children }: NavItemProps) => {
    return (
        <Box
            as={"a"}
            style={{ textDecoration: "none"}}
            _focus={{ boxShadow: "none"}}>
            <Flex
                align={"center"}
                p={4}
                mx={4}
                borderEndRadius={"lg"}
                borderStartRadius={"lg"}
                role="group"
                cursor={"pointer"}
                _hover={{
                    bg: 'teal.600',
                    color: 'white',
                }}>
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

    )
}

export default function Sidebar () {
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
            <Flex h={"20"} alignItems={"center"} mx={"8"} justifyContent={"space-between"}>
                <Text fontSize={"xl"} fontFamily={"monospace"} fontWeight={"bold"}>
                    総合音楽研究会
                </Text>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    <Text fontWeight={"bold"}>
                        {link.name}
                    </Text>
                </NavItem>
            ))}
        </Box>
    )
}