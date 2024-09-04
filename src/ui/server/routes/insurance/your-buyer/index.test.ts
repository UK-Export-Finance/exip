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

import { get as getCurrencyOfLatePayments, post as postCurrencyOfLatePayments } from '../../../controllers/insurance/your-buyer/currency-of-late-payments';

import {
  get as getOutstandingOrOverduePayments,
  post as postOutstandingOrOverduePayments,
} from '../../../controllers/insurance/your-buyer/outstanding-or-overdue-payments';
import { post as postOutstandingOrOverduePaymentsSaveAndBack } from '../../../controllers/insurance/your-buyer/outstanding-or-overdue-payments/save-and-back';

import { get as getFailedToPay, post as postFailedToPay } from '../../../controllers/insurance/your-buyer/failed-to-pay-on-time';
import { post as postFailedToPaySaveAndBack } from '../../../controllers/insurance/your-buyer/failed-to-pay-on-time/save-and-back';

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
    expect(get).toHaveBeenCalledTimes(29);
    expect(post).toHaveBeenCalledTimes(36);

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

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS}`, getCurrencyOfLatePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS}`, postCurrencyOfLatePayments);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, getCurrencyOfLatePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, postCurrencyOfLatePayments);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, getCurrencyOfLatePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, postCurrencyOfLatePayments);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY}`, getFailedToPay);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY}`, postFailedToPay);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_SAVE_AND_BACK}`, postFailedToPaySaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHANGE}`, getFailedToPay);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHANGE}`, postFailedToPay);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHECK_AND_CHANGE}`, getFailedToPay);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHECK_AND_CHANGE}`, postFailedToPay);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS}`, getOutstandingOrOverduePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS}`, postOutstandingOrOverduePayments);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK}`,
      postOutstandingOrOverduePaymentsSaveAndBack,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`, getOutstandingOrOverduePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`, postOutstandingOrOverduePayments);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`, getOutstandingOrOverduePayments);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`, postOutstandingOrOverduePayments);

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
