import { Table } from "@chakra-ui/react";

export type ResultItem = {
  band: string;
  period: number;
  studio: number;
};

type Props = {
  results: ResultItem[];
};

export function ScheduleTable({ results }: Props) {
  const maxPeriod = Math.max(...results.map((r) => r.period));
  const maxStudio = Math.max(...results.map((r) => r.studio));

  const table: string[][] = Array.from({ length: maxPeriod + 1 }, () =>
    Array.from({ length: maxStudio + 1 }, () => "")
  );

  for (const { band, period, studio } of results) {
    table[period][studio] = band;
  }

  return (
    <Table.ScrollArea borderWidth={"1px"} maxW={"6xl"}>
      <Table.Root size={"sm"} variant={"outline"} interactive stickyHeader>
        <Table.Header bg={"teal.600"}>
          <Table.Row>
            <Table.ColumnHeader></Table.ColumnHeader>
            {Array.from({ length: maxStudio + 1 }, (_, i) => (
              <Table.ColumnHeader>st.{i + 1}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array.from({ length: maxPeriod + 1 }, (_, i) => (
            <Table.Row>
              <Table.Cell data-sticky="end">P{i + 1}</Table.Cell>
              {Array.from({ length: maxStudio + 1 }, (_, j) => (
                <Table.Cell>{table[i][j]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
