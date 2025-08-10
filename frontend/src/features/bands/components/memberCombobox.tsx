import { Combobox, Portal, Badge, HStack, CloseButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { useMembers } from "../hooks/useMembers";

type MemberComboboxProps = {
  multi: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
};

export const MemberCombobox = ({
  multi,
  value,
  onChange,
}: MemberComboboxProps) => {
  const { collection, filteredItems, isLoading, setSearchValue } = useMembers();

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
      disabled={isLoading}
    >
      <Combobox.Control>
        <HStack p={"1"} wrap={"wrap"} gap={"1"}>
          {selection.map((member) => (
            <Badge
              key={member}
              variant={"solid"}
              colorScheme={"teal"}
              display={"flex"}
              alignItems={"center"}
              gap={"1"}
            >
              {member}
              <CloseButton size={"sm"} onClick={() => handleClear(member)} />
            </Badge>
          ))}
          <Combobox.Input
            placeholder={isLoading ? "読み込み中..." : "メンバーを選択..."}
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
