import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import { get as getNatureOfBusiness, post as postNatureofBusiness } from '../../../controllers/insurance/business/nature-of-business';

describe('routes/insurance/your-business', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  expect(get).toHaveBeenCalledTimes(3);
  expect(post).toHaveBeenCalledTimes(4);

  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER, redirectToExitPage.noCompaniesHouseNumber);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK, postCompanyDetailsSaveAndBack);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);

  expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, getNatureOfBusiness);
  expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, postNatureofBusiness);
});
