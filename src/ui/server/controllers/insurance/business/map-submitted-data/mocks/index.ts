import { mockCompany } from '../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../constants';
import { RequestBody } from '../../../../../../types';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export const mockBody = {
  _csrf: '1234',
  [INPUT]: '8989898',
  __typename: 'CompaniesHouseResponse',
  ...mockCompany,
  address: {
    ...mockCompany.registeredOfficeAddress,
    __typename: 'CompanyAddress',
  },
  companyNumber: 8989898,
} as RequestBody;
