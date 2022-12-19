import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToNoCompaniesHouseNumberExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

describe('routes/insurance/your-business', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  expect(get).toHaveBeenCalledTimes(2);
  expect(post).toHaveBeenCalledTimes(2);

  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER, redirectToNoCompaniesHouseNumberExitPage);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);
});
