/**
 * FEEDBACK SERVICE
 * ================
 * API service cho Feedback feature.
 */
import { createHttpClient } from '@/shared/services/http/http-client';
import type { ApiResponse } from '@/shared/types/api';
import type { FeedbackItem, CreateFeedbackRequest } from '../types/feedback.types';

class FeedbackService {
  private client = createHttpClient('MAIN');

  async getList(): Promise<FeedbackItem[]> {
    const res = await this.client.get<ApiResponse<FeedbackItem[]>>('/feedbacks');
    return res.data;
  }

  async create(request: CreateFeedbackRequest): Promise<FeedbackItem> {
    const res = await this.client.post<ApiResponse<FeedbackItem>>('/feedbacks', request);
    return res.data;
  }
}

export const feedbackService = new FeedbackService();
