import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';

import { get as getYourBusiness } from '../../../controllers/insurance/business';

import { get as getCompanyDetails, post as postCompanyDetails } from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import {
  get as getAlternativeTradingAddress,
  post as postAlternativeTradingAddress,
} from '../../../controllers/insurance/business/alternative-trading-address';

import { post as postAlternativeTradingAddressSaveAndBack } from '../../../controllers/insurance/business/alternative-trading-address/save-and-back';

import { get as getNatureOfBusiness, post as postNatureOfBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover, post as postTurnover } from '../../../controllers/insurance/business/turnover';
import { post as postTurnoverSaveAndBack } from '../../../controllers/insurance/business/turnover/save-and-back';

import { get as getTurnoverCurrency, post as postTurnoverCurrency } from '../../../controllers/insurance/business/turnover-currency';
import { post as postTurnoverCurrencySaveAndBack } from '../../../controllers/insurance/business/turnover-currency/save-and-back';

import { get as getCreditControl, post as postCreditControl } from '../../../controllers/insurance/business/credit-control';
import { post as postCreditControlSaveAndBack } from '../../../controllers/insurance/business/credit-control/save-and-back';

import { get as getCheckYourAnswers, post as postCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';

describe('routes/insurance/your-business', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(27);
    expect(post).toHaveBeenCalledTimes(32);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ROOT, getYourBusiness);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK, postCompanyDetailsSaveAndBack);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE, postCompanyDetails);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE, getCompanyDetails);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE, postCompanyDetails);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT, getAlternativeTradingAddress);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT, postAlternativeTradingAddress);
    expect(post).toHaveBeenCalledWith(
      ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT_SAVE_AND_BACK,
      postAlternativeTradingAddressSaveAndBack,
    );
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHANGE, getAlternativeTradingAddress);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHANGE, postAlternativeTradingAddress);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE, getAlternativeTradingAddress);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE, postAlternativeTradingAddress);

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

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_ROOT, getTurnoverCurrency);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_ROOT, postTurnoverCurrency);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_SAVE_AND_BACK, postTurnoverCurrencySaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_CHANGE, getTurnoverCurrency);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_CHANGE, postTurnoverCurrency);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_CHECK_AND_CHANGE, getTurnoverCurrency);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY_CHECK_AND_CHANGE, postTurnoverCurrency);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL, postCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_SAVE_AND_BACK, postCreditControlSaveAndBack);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE, postCreditControl);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE, getCreditControl);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE, postCreditControl);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS, getCheckYourAnswers);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS, postCheckYourAnswers);
  });
});
