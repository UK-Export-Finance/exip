import { mockCompany } from '../../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

export const mockBody = {
  _csrf: '1234',
  [COMPANIES_HOUSE_NUMBER]: '8989898',
  __typename: 'CompaniesHouseResponse',
  ...mockCompany,
  address: {
    ...mockCompany.registeredOfficeAddress,
    __typename: 'ExporterCompanyAddress',
  },
  companyNumber: 8989898,
} as RequestBody;
