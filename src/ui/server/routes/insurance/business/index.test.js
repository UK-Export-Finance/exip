import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import { get as getNatureOfBusiness, post as postNatureOfBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover, post as postTurnover } from '../../../controllers/insurance/business/turnover';
import { post as postTurnoverSaveAndBack } from '../../../controllers/insurance/business/turnover/save-and-back';

import { get as getBroker, post as postBroker } from '../../../controllers/insurance/business/broker';
import { post as postBrokerSaveAndBack } from '../../../controllers/insurance/business/broker/save-and-back';

import { get as getCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';

describe('routes/insurance/your-business', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(8);
    expect(post).toHaveBeenCalledTimes(11);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER, redirectToExitPage.noCompaniesHouseNumber);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK, postCompanyDetailsSaveAndBack);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, postCompanyDetails);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, getNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, postNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_SAVE_AND_BACK, postNatureOfBusinessSaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE, getNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE, postNatureOfBusiness);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT, getTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT, postTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_SAVE_AND_BACK, postTurnoverSaveAndBack);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT, getBroker);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT, postBroker);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_SAVE_AND_BACK, postBrokerSaveAndBack);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS, getCheckYourAnswers);
  });
});
