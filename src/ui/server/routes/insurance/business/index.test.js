import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import { get as getCompanyDetails, postCompaniesHouseSearch } from '../../../controllers/insurance/business/company-details';

describe('routes/insurance/your-business', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  expect(get).toHaveBeenCalledTimes(1);
  expect(post).toHaveBeenCalledTimes(1);

  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
});
