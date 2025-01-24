import { ApplicationBroker } from './application';
import { RequestBody } from './express';

export interface BrokerDetailsRedirectUrlParams {
  referenceNumber: number;
  originalUrl: string;
  formBody: RequestBody;
  brokerData: ApplicationBroker;
}

interface BrokerDetailsRedirectUrlChildParams {
  baseUrl: string;
  isAChangeRoute: boolean;
  isACheckAndChangeRoute: boolean;
}

export interface BrokerDetailsNotBasedInUkRedirectUrlParams extends BrokerDetailsRedirectUrlChildParams {
  manualAddressRequired: boolean;
}

export interface BrokerDetailsBasedInUkRedirectUrlParams extends BrokerDetailsRedirectUrlChildParams {
  postcodeOrBuildingNumberNameHasChanged: boolean;
}

export interface BrokerDetailsDataChangeFlagsParams {
  postcodeOrBuildingNumberNameHasChanged: boolean;
  manualAddressRequired: boolean;
}
