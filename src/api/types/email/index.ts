import { SuccessResponse } from '../generic';

export interface EmailResponse extends SuccessResponse {
  emailRecipient: string;
}

export interface NotifyPersonalisation {
  linkToFile?: string;
}

export interface SendExporterEmailVariables {
  urlOrigin: string;
  accountId: string;
  referenceNumber?: string;
}
