import { fetchMembers } from "@/api";
import {
  createListCollection,
  Combobox,
  Wrap,
  Portal,
  Badge,
  HStack,
  CloseButton,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

type MemberSelectorProps = {
  multi: boolean;
  value?: string | string[];
  onChange: (value: any) => void;
};

export const MemberCombobox = ({
  multi,
  value,
  onChange,
}: MemberSelectorProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const members = await fetchMembers();
        setMembers(members);
      } catch (err) {
        console.error("メンバー取得失敗", err);
      }
    };
    getMembers();
  }, []);

  const filteredItems = useMemo(
    () =>
      members.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [members, searchValue]
  );

  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems]
  );

  const selection = useMemo(() => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value) return [value];
    return [];
  }, [value]);

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const newValue = multi ? details.value : details.value[0] ?? "";
    onChange(newValue);
  };

  const handleClear = (itemToRemove: string) => {
    if (multi && Array.isArray(value)) {
      const newValue = value.filter((item) => item !== itemToRemove);
      onChange(newValue);
    } else {
      onChange("");
    }
  };

  return (
    <Combobox.Root
      multiple={multi}
      openOnClick
      closeOnSelect
      width={"100%"}
      value={selection}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <Combobox.Control>
        <HStack p={"1"} wrap={"wrap"} gap={"1"}>
          {selection.map((member, index) => (
            <Badge
              key={`${member}-${index}`}
              variant={"solid"}
              colorScheme={"teal"}
              display={"flex"}
              alignItems={"center"}
              gap={"1"}
              size={"sm"}
            >
              {member}
              <CloseButton size={"sm"} onClick={() => handleClear(member)} />
            </Badge>
          ))}
          <Combobox.Input
            placeholder="メンバーを選択..."
            style={{ flex: 1, minWidth: "120px" }}
          />
        </HStack>
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
  );
};
