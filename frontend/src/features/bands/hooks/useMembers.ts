import { useState, useEffect, useMemo } from "react";
import { getMembers } from "@/api";
import { createListCollection } from "@chakra-ui/react";

export const useMembers = () => {
  const [members, setMembers] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
      } catch (err) {
        console.error("メンバー取得失敗", err);
      } finally {
        setIsLoading(false);
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

  return {
    collection,
    filteredItems,
    isLoading,
    setSearchValue,
  };
};
