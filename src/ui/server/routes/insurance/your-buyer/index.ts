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

import { get as getAlternativeCurrency, post as postAlternativeCurrency } from '../../../controllers/insurance/your-buyer/alternative-currency';

import { get as getCreditInsuranceCover, post as postCreditInsuranceCover } from '../../../controllers/insurance/your-buyer/credit-insurance-cover';

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

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, getAlternativeCurrency);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.ALTERNATIVE_CURRENCY}`, postAlternativeCurrency);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, getCreditInsuranceCover);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CREDIT_INSURANCE_COVER}`, postCreditInsuranceCover);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default yourBuyerRouter;
