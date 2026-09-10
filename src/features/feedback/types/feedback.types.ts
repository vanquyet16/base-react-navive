/**
 * FEEDBACK TYPES
 * ==============
 */
export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  status: FeedbackStatus;
  createdAt: string;
}

export type FeedbackStatus = 'pending' | 'processing' | 'resolved' | 'rejected';

export interface CreateFeedbackRequest {
  title: string;
  content: string;
  categoryId: string;
  attachments?: string[];
}
