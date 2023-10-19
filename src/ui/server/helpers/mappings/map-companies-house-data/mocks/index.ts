import { mockCompany } from '../../../../test-mocks';
import { RequestBody } from '../../../../../types';

const mockBody = {
  _csrf: '1234',
  __typename: 'CompaniesHouseResponse',
  ...mockCompany,
  registeredOfficeAddress: {
    ...mockCompany.registeredOfficeAddress,
    __typename: 'ExporterCompanyAddress',
  },
} as RequestBody;

export default mockBody;
