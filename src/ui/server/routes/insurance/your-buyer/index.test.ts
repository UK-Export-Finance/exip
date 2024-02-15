import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get, post } from '../../../test-mocks/mock-router';
import { get as buyerRootGet } from '../../../controllers/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

import { get as getConnectionWithBuyer, post as postConnectionWithBuyer } from '../../../controllers/insurance/your-buyer/connection-with-buyer';
import { post as postConnectionToTheBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/connection-with-buyer/save-and-back';

import { get as getTradedWithBuyer, post as postTradedWithBuyer } from '../../../controllers/insurance/your-buyer/traded-with-buyer';
import { post as postTradedWithBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/traded-with-buyer/save-and-back';

import { get as getTradingHistory, post as postTradingHistory } from '../../../controllers/insurance/your-buyer/trading-history';
import { post as postTradingHistorySaveAndBack } from '../../../controllers/insurance/your-buyer/trading-history/save-and-back';

import { get as getAlternativeCurrency, post as postAlternativeCurrency } from '../../../controllers/insurance/your-buyer/alternative-currency';

import { get as getCreditInsuranceCover, post as postCreditInsuranceCover } from '../../../controllers/insurance/your-buyer/credit-insurance-cover';
import { post as postCreditInsuranceCoverSaveAndBack } from '../../../controllers/insurance/your-buyer/credit-insurance-cover/save-and-back';

import {
  get as getBuyerFinancialInformation,
  post as postBuyerFinancialInformation,
} from '../../../controllers/insurance/your-buyer/buyer-financial-information';
import { post as postBuyerFinancialInformationSaveAndBack } from '../../../controllers/insurance/your-buyer/buyer-financial-information/save-and-back';

import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/your-buyer/check-your-answers';

describe('routes/insurance/your-buyer', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(21);
    expect(post).toHaveBeenCalledTimes(26);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ROOT}`, buyerRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, postCompanyOrOrganisation);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, postCompanyOrOrganisation);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, postConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_SAVE_AND_BACK}`, postConnectionToTheBuyerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, postConnectionWithBuyer);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, getConnectionWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, postConnectionWithBuyer);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, postTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_SAVE_AND_BACK}`, postTradedWithBuyerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, postTradedWithBuyer);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, getTradedWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, postTradedWithBuyer);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, getTradingHistory);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, postTradingHistory);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_SAVE_AND_BACK}`, postTradingHistorySaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHANGE}`, getTradingHistory);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHANGE}`, postTradingHistory);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHECK_AND_CHANGE}`, getTradingHistory);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHECK_AND_CHANGE}`, postTradingHistory);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, getAlternativeCurrency);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, postAlternativeCurrency);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, getCreditInsuranceCover);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, postCreditInsuranceCover);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_SAVE_AND_BACK}`, postCreditInsuranceCoverSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHANGE}`, getCreditInsuranceCover);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHANGE}`, postCreditInsuranceCover);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE}`, getCreditInsuranceCover);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE}`, postCreditInsuranceCover);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION}`, getBuyerFinancialInformation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION}`, postBuyerFinancialInformation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_SAVE_AND_BACK}`, postBuyerFinancialInformationSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHANGE}`, getBuyerFinancialInformation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHANGE}`, postBuyerFinancialInformation);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE}`, getBuyerFinancialInformation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE}`, postBuyerFinancialInformation);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});
