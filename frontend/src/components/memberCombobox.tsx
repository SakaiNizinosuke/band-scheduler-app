import { createListCollection, Combobox, Wrap, Portal, Badge } from "@chakra-ui/react"
import { useMemo, useState } from "react"
type MemberSelectorProps = {
    part: string
    multi: boolean
    selectedMembers: string[]
    onChange: (value: string[]) => void
    searchValue: string
    setSearchValue: (value: string) => void
}

const members = [
    "坂井",
    "郡山",
    "中村",
    "太田",
    "宗",
    "小林",
]

export const MemberCombobox = ({ part, multi, selectedMembers, onChange, searchValue, setSearchValue }: MemberSelectorProps) => {
    const filteredItems = useMemo(
        () =>
            members.filter((item) =>
            item.toLowerCase().includes(searchValue.toLowerCase()),
        ),
        [members, searchValue],
    )

    const collection = useMemo(
        () => createListCollection({ items: filteredItems }),
        [filteredItems],
    )

    return (
        <Combobox.Root
            multiple={multi}
            openOnClick
            closeOnSelect
            width={"320px"}
            value={selectedMembers}
            collection={collection}
            onValueChange={(details) => onChange(details.value)}
            onInputValueChange={(details) => setSearchValue(details.inputValue)}
        >
            <Wrap gap={"2"}>
                {selectedMembers.map((member) => (
                    <Badge key={member}>{member}</Badge>
                ))}
            </Wrap>

            <Combobox.Label>{part}（複数人選択可能）</Combobox.Label>

            <Combobox.Control>
                <Combobox.Input placeholder="Type to search"/>
                <Combobox.IndicatorGroup>
                    <Combobox.Trigger />
                </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content>
                        <Combobox.ItemGroup>
                            {filteredItems.map((item) => (
                                <Combobox.Item key={item} item={item}>
                                    {item}
                                    <Combobox.ItemIndicator />
                                </Combobox.Item>
                            ))}
                        </Combobox.ItemGroup>
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox.Root>
    )
}