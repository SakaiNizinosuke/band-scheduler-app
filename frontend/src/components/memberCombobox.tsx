import {
  createListCollection,
  Combobox,
  Wrap,
  Portal,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

type MemberSelectorProps = {
  multi: boolean;
  value?: string[];
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
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:3001/members");
        const data = await res.json();
        setMembers(data.members || []);
      } catch (err) {
        console.error("メンバー取得失敗", err);
      }
    };
    fetchMembers();
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

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    onChange(details.value);
  };

  return (
    <Combobox.Root
      multiple={multi}
      openOnClick
      closeOnSelect
      width={"100%"}
      value={value}
      collection={collection}
      onValueChange={handleValueChange}
      onInputValueChange={(details) => setSearchValue(details.inputValue)}
    >
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      {value != undefined && (
        <Wrap gap={"2"}>
          {value.map((member) => (
            <Badge key={member}>{member}</Badge>
          ))}
        </Wrap>
      )}

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
