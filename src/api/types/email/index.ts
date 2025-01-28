import { SuccessResponse } from '../generic';

export interface SendConfirmEmailAddressVariables {
  urlOrigin: string;
  accountId: string;
  referenceNumber?: string;
}

export interface SubmissionDeadlineEmailVariables {
  referenceNumber: string;
  submissionDeadline: string;
  name: string;
  applicationUrl: string;
  buyerName: string;
  email: string;
}

interface ApimSendEmailResponseData {
  content: object;
  id: string;
  reference: string;
  template: object;
  uri: string;
}

export interface ApimSendEmailResponse {
  data: ApimSendEmailResponseData;
  status: number;
}

export interface ApimSendEmailHelperResponse extends SuccessResponse {
  emailRecipient: string;
}
