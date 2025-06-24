import { Field, NumberInput } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import type { Control, FieldError } from 'react-hook-form'

type Props = {
    control: Control<any>
    name: string
    label: string
    error?: FieldError
    min?: number 
}

export const NumberField = ({ control, name, label, error, min }: Props) => {
    return (
        <Field.Root invalid={!!error}>
            <Field.Label>{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <NumberInput.Root
                        min={min}
                        value={field.value}   
                        name={field.name}
                        onValueChange={({ valueAsNumber }) => {
                            field.onChange(valueAsNumber)
                        }}
                    >
                        <NumberInput.Control />
                        <NumberInput.Input
                            onBlur={field.onBlur}
                            inputMode='numeric'
                            type='number'
                        />
                    </NumberInput.Root>
                )}
            />
            <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
    )
}