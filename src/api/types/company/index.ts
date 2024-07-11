import { CompanyUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationCompanyAddress } from '../application-types';

export interface CompanyResponse {
  id: string;
  applicationId: string;
}

export interface UpdateCompanyAndCompanyAddressVariablesData {
  address?: ApplicationCompanyAddress;
  sicCodes?: [string];
  industrySectorNames?: [string];
  company?: CompanyUpdateInput;
}

export interface UpdateCompanyAndCompanyAddressVariables {
  companyId: string;
  companyAddressId: string;
  data: UpdateCompanyAndCompanyAddressVariablesData;
}
