import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import { get as getCompanyDetails, post as postCompanyDetails } from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import {
  get as getAlternativeTradingAddress,
  post as postAlternativeTradingAddress,
} from '../../../controllers/insurance/business/alternative-trading-address';

import { get as getNatureOfBusiness, post as postNatureOfBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover, post as postTurnover } from '../../../controllers/insurance/business/turnover';
import { post as postTurnoverSaveAndBack } from '../../../controllers/insurance/business/turnover/save-and-back';

import { get as getTurnoverCurrency } from '../../../controllers/insurance/business/turnover/currency';

import { get as getCreditControl, post as postCreditControl } from '../../../controllers/insurance/business/credit-control';
import { post as postCreditControlSaveAndBack } from '../../../controllers/insurance/business/credit-control/save-and-back';

import { get as getCheckYourAnswers, post as postCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';
import { post as postCheckYourAnswersSaveAndBack } from '../../../controllers/insurance/business/check-your-answers/save-and-back';

describe('routes/insurance/your-business', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(21);
    expect(post).toHaveBeenCalledTimes(25);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK, postCompanyDetailsSaveAndBack);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, postCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE, postCompanyDetails);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT, getAlternativeTradingAddress);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT, postAlternativeTradingAddress);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, getNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT, postNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_SAVE_AND_BACK, postNatureOfBusinessSaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE, getNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE, postNatureOfBusiness);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHECK_AND_CHANGE, getNatureOfBusiness);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHECK_AND_CHANGE, postNatureOfBusiness);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT, getTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT, postTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_SAVE_AND_BACK, postTurnoverSaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE, getTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE, postTurnover);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHECK_AND_CHANGE, getTurnover);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHECK_AND_CHANGE, postTurnover);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY, getTurnoverCurrency);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL, postCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_SAVE_AND_BACK, postCreditControlSaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE, postCreditControl);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE, postCreditControl);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS, getCheckYourAnswers);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS, postCheckYourAnswers);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS_SAVE_AND_BACK, postCheckYourAnswersSaveAndBack);
  });
});
