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
  type Path,
  type Control,
  type UseControllerProps,
} from 'react-hook-form';
import { useState, useCallback } from 'react';
import CustomToast from '@/shared/utils/CustomToast';

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
  clearFieldError: (fieldName: Path<T>) => void;
  /** Xóa toàn bộ lỗi form */
  clearAllErrors: () => void;
  /** Kiểm tra tính hợp lệ của form */
  isFormValid: boolean;
  /** Helper lấy props cho Controller */
  getControllerProps: (
    fieldName: Path<T>,
    rules?: UseControllerProps<T>['rules'],
  ) => { name: Path<T>; control: Control<T>; rules?: UseControllerProps<T>['rules'] };
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
            CustomToast.success(successMessage);
          }

          if (resetOnSuccess) {
            form.reset();
          }
        } catch (error) {
          const message = error instanceof Error && error.message ? error.message : errorMessage;

          setSubmitError(message);

          if (showErrorToast) {
            CustomToast.error(message);
          }
          // Không ném tiếp: handler gắn thẳng vào onPress, lỗi đã nằm trong `submitError`
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
    (fieldName: Path<T>) => {
      form.clearErrors(fieldName);
    },
    [form],
  );

  const clearAllErrors = useCallback(() => {
    form.clearErrors();
    setSubmitError(null);
  }, [form]);

  const getControllerProps = useCallback(
    (fieldName: Path<T>, rules?: UseControllerProps<T>['rules']) => {
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