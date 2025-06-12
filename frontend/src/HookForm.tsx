import { useForm, type SubmitHandler } from "react-hook-form";
import React from "react";
import {
    FormErrorMessage,
    FormLabel,
    Input,
    Button,
    FormControl
} from "@chakra-ui/react";

type FormValues = {
    name: string;
};

export default function HookForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                    id="name"
                    placeholder="name"
                    {...register("name", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimam length should be 4"}
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    );
}