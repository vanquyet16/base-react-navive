/**
 * USE BASE FORM HOOK
 * ==================
 * Hook wrapper xung quanh react-hook-form với error handling và loading state tối ưu.
 * Tận dụng formState của react-hook-form để tránh re-render không cần thiết.
 */

import {
  useForm,
  type UseFormProps,
  type FieldValues,
  type UseFormReturn,
  type FieldError,
} from 'react-hook-form';
import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';

export interface UseBaseFormProps<T extends FieldValues> extends UseFormProps<T> {
  /** Hàm xử lý khi submit form */
  onSubmit: (data: T) => Promise<void> | void;
  /** Thông báo thành công hiển thị qua Toast */
  successMessage?: string;
  /** Thông báo lỗi mặc định khi submit thất bại */
  errorMessage?: string;
  /** Tự động reset form sau khi submit thành công */
  resetOnSuccess?: boolean;
  /** Hiển thị Toast khi submit thành công (mặc định: false nếu mutation đã xử lý) */
  showSuccessToast?: boolean;
  /** Hiển thị Toast khi submit thất bại (mặc định: false để tránh spam toast khi mutation/interceptor đã bắn) */
  showErrorToast?: boolean;
}

export interface UseBaseFormReturn<T extends FieldValues> extends UseFormReturn<T> {
  /** Trạng thái đang submit (tận dụng từ formState của react-hook-form) */
  isSubmitting: boolean;
  /** Callback kích hoạt submit form kèm loading và error handling */
  handleSubmitWithLoading: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** Lỗi submit gần nhất nếu có */
  submitError: string | null;
  /** Xóa lỗi submit */
  clearSubmitError: () => void;
  /** Lấy lỗi của một field cụ thể */
  getFieldError: (fieldName: keyof T) => FieldError | undefined;
  /** Kiểm tra xem field có lỗi không */
  hasFieldError: (fieldName: keyof T) => boolean;
  /** Xóa lỗi của một field */
  clearFieldError: (fieldName: keyof T) => void;
  /** Xóa toàn bộ lỗi form */
  clearAllErrors: () => void;
  /** Kiểm tra tính hợp lệ của form */
  isFormValid: boolean;
  /** Helper lấy props cho Controller */
  getControllerProps: (fieldName: keyof T, rules?: any) => { name: keyof T; control: any; rules?: any };
}

export const useBaseForm = <T extends FieldValues>({
  onSubmit,
  successMessage = 'Thành công!',
  errorMessage = 'Có lỗi xảy ra!',
  resetOnSuccess = false,
  showSuccessToast = false,
  showErrorToast = false, // Mặc định false để ưu tiên mutation layer xử lý toast duy nhất
  ...formProps
}: UseBaseFormProps<T>): UseBaseFormReturn<T> => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<T>(formProps);

  const clearSubmitError = useCallback(() => {
    setSubmitError(null);
  }, []);

  // Handler thực thi submit kèm wrap try/catch
  const handleSubmitWithLoading = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      setSubmitError(null);
      return form.handleSubmit(async (data: T) => {
        try {
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
          const message =
            error?.message ||
            error?.response?.data?.message ||
            errorMessage;

          setSubmitError(message);

          if (showErrorToast) {
            Toast.show({
              type: 'error',
              text1: 'Lỗi',
              text2: message,
            });
          }
          // Ném lỗi tiếp tục để caller (nếu có) xử lý tiếp
          throw error;
        }
      })(e);
    },
    [form, onSubmit, showSuccessToast, successMessage, resetOnSuccess, errorMessage, showErrorToast],
  );

  const getFieldError = useCallback(
    (fieldName: keyof T): FieldError | undefined => {
      return form.formState.errors[fieldName] as FieldError | undefined;
    },
    [form.formState.errors],
  );

  const hasFieldError = useCallback(
    (fieldName: keyof T): boolean => {
      return !!form.formState.errors[fieldName];
    },
    [form.formState.errors],
  );

  const clearFieldError = useCallback(
    (fieldName: keyof T) => {
      form.clearErrors(fieldName as any);
    },
    [form],
  );

  const clearAllErrors = useCallback(() => {
    form.clearErrors();
    setSubmitError(null);
  }, [form]);

  const getControllerProps = useCallback(
    (fieldName: keyof T, rules?: any) => {
      return {
        name: fieldName,
        control: form.control,
        rules,
      };
    },
    [form.control],
  );

  return {
    ...form,
    isSubmitting: form.formState.isSubmitting,
    handleSubmitWithLoading,
    submitError,
    clearSubmitError,
    getFieldError,
    hasFieldError,
    clearFieldError,
    clearAllErrors,
    isFormValid: form.formState.isValid,
    getControllerProps,
  };
};