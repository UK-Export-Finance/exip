import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

describe('routes/insurance/your-business', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  expect(get).toHaveBeenCalledTimes(2);
  expect(post).toHaveBeenCalledTimes(3);

  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER, redirectToExitPage.noCompaniesHouseNumber);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.SAVE_AND_BACK_URL, postCompanyDetailsSaveAndBack);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);
});
