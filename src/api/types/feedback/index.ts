import { SuccessResponse } from '../generic';

export interface Feedback extends SuccessResponse {
  id: string;
  service: string;
  satisfaction: string;
  improvement: string;
  otherComments: string;
  referralUrl: string;
  product: string;
  createdAt: string;
}

export interface InsuranceFeedbackVariables {
  satisfaction?: string;
  improvement?: string;
  otherComments?: string;
  referralUrl?: string;
  createdAt?: Date;
  date?: string;
  time?: string;
}
