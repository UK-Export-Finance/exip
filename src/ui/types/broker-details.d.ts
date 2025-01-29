import { RequestBody } from './express';

export interface BrokerDetailsRedirectUrlParams {
  referenceNumber: number;
  originalUrl: string;
  formBody: RequestBody;
}

export interface BrokerDetailsRedirectUrlChildParams {
  baseUrl: string;
  isAChangeRoute: boolean;
  isACheckAndChangeRoute: boolean;
}

export interface BrokerDetailsNotBasedInUkRedirectUrlParams extends BrokerDetailsRedirectUrlChildParams {
  manualAddressRequired: boolean;
}

export interface BrokerDetailsDataChangeFlagsParams {
  manualAddressRequired: boolean;
}
