import { SuccessResponse } from '../generic';

export interface EmailResponse extends SuccessResponse {
  emailRecipient: string;
}

export interface NotifyPersonalisation {
  linkToFile?: string;
}

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
