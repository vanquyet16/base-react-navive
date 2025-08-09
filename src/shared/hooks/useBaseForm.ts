import { useForm, UseFormProps, FieldValues, UseFormReturn, FieldError } from 'react-hook-form';
import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface UseBaseFormProps<T extends FieldValues> extends UseFormProps<T> {
    onSubmit: (data: T) => Promise<void> | void;
    successMessage?: string;
    errorMessage?: string;
    resetOnSuccess?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
}

interface UseBaseFormReturn<T extends FieldValues> extends UseFormReturn<T> {
    isSubmitting: boolean;
    handleSubmitWithLoading: () => void;
    submitError: string | null;
    clearSubmitError: () => void;
    getFieldError: (fieldName: keyof T) => FieldError | undefined;
    hasFieldError: (fieldName: keyof T) => boolean;
    clearFieldError: (fieldName: keyof T) => void;
    clearAllErrors: () => void;
    isFormValid: boolean;
    getControllerProps: (fieldName: keyof T, rules?: any) => any;
}

export const useBaseForm = <T extends FieldValues>({
    onSubmit,
    successMessage = 'Thành công!',
    errorMessage = 'Có lỗi xảy ra!',
    resetOnSuccess = true,
    showSuccessToast = true,
    showErrorToast = true,
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

            if (showSuccessToast) {
                Toast.show({
                    type: 'success',
                    text1: successMessage,
                });
            }

            if (resetOnSuccess) {
                form.reset();
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || errorMessage;
            setSubmitError(message);

            if (showErrorToast) {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: message,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    });

    const clearSubmitError = useCallback(() => {
        setSubmitError(null);
    }, []);

    const getFieldError = useCallback((fieldName: keyof T): FieldError | undefined => {
        return form.formState.errors[fieldName] as FieldError | undefined;
    }, [form.formState.errors]);

    const hasFieldError = useCallback((fieldName: keyof T): boolean => {
        return !!form.formState.errors[fieldName];
    }, [form.formState.errors]);

    const clearFieldError = useCallback((fieldName: keyof T) => {
        form.clearErrors(fieldName as any);
    }, [form]);

    const clearAllErrors = useCallback(() => {
        form.clearErrors();
        setSubmitError(null);
    }, [form]);

    const getControllerProps = useCallback((fieldName: keyof T, rules?: any) => {
        return {
            name: fieldName,
            control: form.control,
            rules,
        };
    }, [form.control]);

    const isFormValid = form.formState.isValid;

    return {
        ...form,
        isSubmitting,
        handleSubmitWithLoading,
        submitError,
        clearSubmitError,
        getFieldError,
        hasFieldError,
        clearFieldError,
        clearAllErrors,
        isFormValid,
        getControllerProps,
    };
}; 