import { Button, VStack, SimpleGrid, Box, Card } from "@chakra-ui/react";
import { NumberField } from "@/components/numberField";
import type { Control, FieldErrors } from "react-hook-form";
import type { SchedulerFormValues } from "../schedulerSettings";

interface SchedulerSettingFormProps {
  control: Control<SchedulerFormValues>;
  errors: FieldErrors<SchedulerFormValues>;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const SchedulerSettingForm = ({
  control,
  errors,
  isLoading,
  onSubmit,
}: SchedulerSettingFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Card.Root colorPalette={"teal"} maxW={"xl"} mx={"auto"}>
        <Card.Body>
          <VStack align="stretch">
            <SimpleGrid columns={2} rowGap={5} columnGap={10} mx="auto">
              <NumberField
                control={control}
                name="period_num"
                label="時限数"
                error={errors.period_num}
                min={1}
              />
              <NumberField
                control={control}
                name="studio_num"
                label="スタジオ数"
                error={errors.studio_num}
                min={1}
              />
              <NumberField
                control={control}
                name="rehearsal_min_num"
                label="最小練習回数"
                error={errors.rehearsal_min_num}
                min={0}
              />
              <NumberField
                control={control}
                name="rehearsal_max_num"
                label="最大練習回数"
                error={errors.rehearsal_max_num}
                min={0}
              />
            </SimpleGrid>

            <Button
              type="submit"
              colorScheme="teal"
              size="sm"
              mt={4}
              loading={isLoading}
            >
              スケジュールを作成
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </form>
  );
};
