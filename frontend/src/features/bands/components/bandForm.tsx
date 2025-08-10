import { VStack, Field, Box, Input, FieldErrorText } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { MemberCombobox } from "./memberCombobox";
import { parts, parts_jp } from "../bandFormSettings";
import type { Control, FieldErrors } from "react-hook-form";
import type { FormValues } from "../bandFormSettings";

interface BandFormProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const BandForm = ({ control, errors }: BandFormProps) => {
  return (
    <VStack align={"stretch"}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={!!errors.name}>
            <Field.Label>
              バンド名 <Field.RequiredIndicator />
            </Field.Label>
            <Input {...field} autoComplete="organization" />
            <FieldErrorText>{errors.name?.message}</FieldErrorText>
          </Field.Root>
        )}
      />

      {parts.map((part) => (
        <Controller
          key={part}
          name={part}
          control={control}
          render={({ field }) => (
            <Field.Root invalid={!!errors[part]}>
              <Field.Label>{parts_jp[part]}（複数人選べます）</Field.Label>
              <MemberCombobox
                multi={true}
                value={field.value ?? []}
                onChange={field.onChange}
              />
              <FieldErrorText>{errors[part]?.message}</FieldErrorText>
            </Field.Root>
          )}
        />
      ))}

      <Controller
        name="songs"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={!!errors.songs}>
            <Field.Label>曲名</Field.Label>
            <Input {...field} value={field.value ?? ""} />
            <FieldErrorText>{errors.songs?.message}</FieldErrorText>
          </Field.Root>
        )}
      />

      <Controller
        name="leader"
        control={control}
        render={({ field }) => (
          <Field.Root invalid={!!errors.leader}>
            <Field.Label>
              代表者 <Field.RequiredIndicator />
            </Field.Label>
            <MemberCombobox
              multi={false}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
            <FieldErrorText>{errors.leader?.message}</FieldErrorText>
          </Field.Root>
        )}
      />
    </VStack>
  );
};
