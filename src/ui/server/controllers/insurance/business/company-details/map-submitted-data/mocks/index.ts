import { mockCompany } from '../../../../../../test-mocks';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_HOUSE: { COMPANY_NUMBER },
} = INSURANCE_FIELD_IDS;

export const mockBody = {
  _csrf: '1234',
  [COMPANY_NUMBER]: '8989898',
  __typename: 'CompaniesHouseResponse',
  ...mockCompany,
  address: {
    ...mockCompany.registeredOfficeAddress,
    __typename: 'ExporterCompanyAddress',
  },
  companyNumber: 8989898,
} as RequestBody;
