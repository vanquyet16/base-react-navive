/**
 * FEEDBACK QUERIES
 * ================
 */
import { useMemo } from 'react';
import { useBaseQuery, useBaseMutation } from '@/shared/hooks';
import { feedbackService } from '../../services/feedback.service';
import type { CreateFeedbackRequest } from '../../types/feedback.types';

export const feedbackKeys = {
  all: ['feedbacks'] as const,
  list: () => [...feedbackKeys.all, 'list'] as const,
} as const;

export const useGetFeedbackList = () => {
  const queryKey = useMemo(() => feedbackKeys.list(), []);
  return useBaseQuery({
    queryKey,
    queryFn: feedbackService.getList.bind(feedbackService),
  });
};

export const useCreateFeedback = () => {
  return useBaseMutation({
    mutationFn: (data: CreateFeedbackRequest) => feedbackService.create(data),
    invalidateQueries: [feedbackKeys.list()],
    showSuccessToast: true,
    successMessage: 'Gửi phản ánh thành công!',
    showErrorToast: true,
    errorMessage: 'Gửi phản ánh thất bại',
  });
};
