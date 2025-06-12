import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { NumberField } from "./NumberField";

type FormValues = {
    numberOfStudios: number;
    numberOfPeriods: number;
    minNumberOfRehearsal: number;
    maxNumberOfRehearsal: number;
};

export default function HookForm() {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <NumberField
                control={control}
                name="numberOfStudios"
                label="スタジオ数"
                error={errors.numberOfStudios}
                min={1}
            />
            <NumberField
                control={control}
                name="numberOfPeriods"
                label="時限数"
                error={errors.numberOfPeriods}
                min={1}
            />
            <NumberField
                control={control}
                name="minNumberOfRehearsal"
                label="最小練習回数"
                error={errors.minNumberOfRehearsal}
                min={1}
            />
            <NumberField
                control={control}
                name="maxNumberOfRehearsal"
                label="最大練習回数"
                error={errors.maxNumberOfRehearsal}
                min={1}
            />

            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                送信
            </Button>
        </form>
    );
}