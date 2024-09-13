import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as buyerRootGet } from '../../../controllers/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

import { get as getTradedWithBuyer, post as postTradedWithBuyer } from '../../../controllers/insurance/your-buyer/traded-with-buyer';
import { post as postTradedWithBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/traded-with-buyer/save-and-back';

import { get as getConnectionWithBuyer, post as postConnectionWithBuyer } from '../../../controllers/insurance/your-buyer/connection-with-buyer';
import { post as postConnectionToTheBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/connection-with-buyer/save-and-back';

import { get as getTradingHistory, post as postTradingHistory } from '../../../controllers/insurance/your-buyer/trading-history';
import { post as postTradingHistorySaveAndBack } from '../../../controllers/insurance/your-buyer/trading-history/save-and-back';

import { get as getCurrencyOfLatePayments, post as postCurrencyOfLatePayments } from '../../../controllers/insurance/your-buyer/currency-of-late-payments';

import {
  get as getOutstandingOrOverduePayments,
  post as postOutstandingOrOverduePayments,
} from '../../../controllers/insurance/your-buyer/outstanding-or-overdue-payments';
import { post as postOutstandingOrOverduePaymentsSaveAndBack } from '../../../controllers/insurance/your-buyer/outstanding-or-overdue-payments/save-and-back';

import { get as getCreditInsuranceCover, post as postCreditInsuranceCover } from '../../../controllers/insurance/your-buyer/credit-insurance-cover';
import { post as postCreditInsuranceCoverSaveAndBack } from '../../../controllers/insurance/your-buyer/credit-insurance-cover/save-and-back';

import { get as getFailedToPay, post as postFailedToPay } from '../../../controllers/insurance/your-buyer/failed-to-pay-on-time';
import { post as postFailedToPaySaveAndBack } from '../../../controllers/insurance/your-buyer/failed-to-pay-on-time/save-and-back';

import {
  get as getBuyerFinancialInformation,
  post as postBuyerFinancialInformation,
} from '../../../controllers/insurance/your-buyer/buyer-financial-information';
import { post as postBuyerFinancialInformationSaveAndBack } from '../../../controllers/insurance/your-buyer/buyer-financial-information/save-and-back';

import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/your-buyer/check-your-answers';

// @ts-ignore
const yourBuyerRouter = express.Router();

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.ROOT}`, buyerRootGet);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, getCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHANGE}`, postCompanyOrOrganisation);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, getCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, postCompanyOrOrganisation);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, getTradedWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER}`, postTradedWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_SAVE_AND_BACK}`, postTradedWithBuyerSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, getTradedWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHANGE}`, postTradedWithBuyer);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, getTradedWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, postTradedWithBuyer);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, getConnectionWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER}`, postConnectionWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_SAVE_AND_BACK}`, postConnectionToTheBuyerSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, getConnectionWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHANGE}`, postConnectionWithBuyer);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, getConnectionWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, postConnectionWithBuyer);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, getTradingHistory);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY}`, postTradingHistory);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_SAVE_AND_BACK}`, postTradingHistorySaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHANGE}`, getTradingHistory);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHANGE}`, postTradingHistory);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHECK_AND_CHANGE}`, getTradingHistory);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.TRADING_HISTORY_CHECK_AND_CHANGE}`, postTradingHistory);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS}`, getCurrencyOfLatePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS}`, postCurrencyOfLatePayments);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, getCurrencyOfLatePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, postCurrencyOfLatePayments);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, getCurrencyOfLatePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, postCurrencyOfLatePayments);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY}`, getFailedToPay);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY}`, postFailedToPay);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_SAVE_AND_BACK}`, postFailedToPaySaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHANGE}`, getFailedToPay);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHANGE}`, postFailedToPay);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHECK_AND_CHANGE}`, getFailedToPay);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.FAILED_TO_PAY_CHECK_AND_CHANGE}`, postFailedToPay);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS}`, getOutstandingOrOverduePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS}`, postOutstandingOrOverduePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK}`, postOutstandingOrOverduePaymentsSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`, getOutstandingOrOverduePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`, postOutstandingOrOverduePayments);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`, getOutstandingOrOverduePayments);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`, postOutstandingOrOverduePayments);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, getCreditInsuranceCover);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, postCreditInsuranceCover);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_SAVE_AND_BACK}`, postCreditInsuranceCoverSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHANGE}`, getCreditInsuranceCover);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHANGE}`, postCreditInsuranceCover);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE}`, getCreditInsuranceCover);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE}`, postCreditInsuranceCover);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION}`, getBuyerFinancialInformation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION}`, postBuyerFinancialInformation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_SAVE_AND_BACK}`, postBuyerFinancialInformationSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHANGE}`, getBuyerFinancialInformation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHANGE}`, postBuyerFinancialInformation);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE}`, getBuyerFinancialInformation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE}`, postBuyerFinancialInformation);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default yourBuyerRouter;
