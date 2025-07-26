import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

interface UseBaseFormProps<T extends FieldValues> extends UseFormProps<T> {
    onSubmit: (data: T) => Promise<void> | void;
    successMessage?: string;
    errorMessage?: string;
    resetOnSuccess?: boolean;
}

interface UseBaseFormReturn<T extends FieldValues> extends UseFormReturn<T> {
    isSubmitting: boolean;
    handleSubmitWithLoading: () => void;
    submitError: string | null;
}

export const useBaseForm = <T extends FieldValues>({
    onSubmit,
    successMessage = 'Thành công!',
    errorMessage = 'Có lỗi xảy ra!',
    resetOnSuccess = true,
    ...formProps
}: UseBaseFormProps<T>): UseBaseFormReturn<T> => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<T>(formProps);

    const handleSubmitWithLoading = form.handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            await onSubmit(data);

            Toast.show({
                type: 'success',
                text1: successMessage,
            });

            if (resetOnSuccess) {
                form.reset();
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || errorMessage;
            setSubmitError(message);

            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: message,
            });
        } finally {
            setIsSubmitting(false);
        }
    });

    return {
        ...form,
        isSubmitting,
        handleSubmitWithLoading,
        submitError,
    };
}; 