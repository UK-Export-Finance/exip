import Context from '@keystone-6/core/types';
import { ApplicationCreateInput, BuyerCreateInput, PolicyCreateInput } from '.keystone/types'; // eslint-disable-line
import { Account } from '../account';

export interface TestHelperCreate {
  context: Context;
  companyId?: string;
  // TODO
  // TODO
  // TODO
  // TODO
  // TODO: real type. for international/uk vector test helpers.
  data?: object;
}

export interface TestHelperAccountCreate extends TestHelperCreate {
  data?: Account;
  deleteAccounts?: boolean;
}

export interface TestHelperApplicationCreate extends TestHelperCreate {
  data: ApplicationCreateInput;
}

export interface TestHelperApplicationGet {
  context: Context;
  applicationId: string;
}

export interface TestHelperApplicationUpdate {
  context: Context;
  applicationId: string;
  data: object;
}

export interface TestHelperBuyerCreate extends TestHelperCreate {
  data: BuyerCreateInput;
}

export interface TestHelperPolicyCreate extends TestHelperCreate {
  data: PolicyCreateInput;
}
