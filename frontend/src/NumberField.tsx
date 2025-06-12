import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

type NumberFieldInfo = {
    control: Control<any>;
    error?: FieldError;
    name: string;
    label: string;
    min: number;
};

export const NumberField: React.FC<NumberFieldInfo> = ({ control, error, name, label, min }) => {
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: "これは必須項目です！",
                        min: {value: min, message: `${min}以上の数を入力してください`},
                    }}
                    render={({ field }) => (
                        <NumberInput
                            min={min}
                            onChange={(value) => field.onChange(value)}
                        >
                            <NumberInputField id={name} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    )}
                />
            <FormErrorMessage>{error?.message}</FormErrorMessage> 
        </FormControl>
    );
};