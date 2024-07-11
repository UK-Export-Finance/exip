import express from 'express';
import { ROUTES } from '../../../constants';

import { get as getYourBusiness } from '../../../controllers/insurance/business';

import { get as getEnterCompaniesHouseNumber, post as postEnterCompaniesHouseNumber } from '../../../controllers/insurance/business/companies-house-search';

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

import {
  get as getTurnoverAlternativeCurrency,
  post as postTurnoverAlternativeCurrency,
} from '../../../controllers/insurance/business/turnover/alternative-currency';

import { get as getCreditControl, post as postCreditControl } from '../../../controllers/insurance/business/credit-control';
import { post as postCreditControlSaveAndBack } from '../../../controllers/insurance/business/credit-control/save-and-back';

import { get as getCheckYourAnswers, post as postCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';

// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ROOT}`, getYourBusiness);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER}`, getEnterCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ENTER_COMPANIES_HOUSE_NUMBER}`, postEnterCompaniesHouseNumber);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK}`, postCompanyDetailsSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, postCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, postCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE}`, postCompanyDetails);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT}`, getAlternativeTradingAddress);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT}`, postAlternativeTradingAddress);
insuranceBusinessRouter.post(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_ROOT_SAVE_AND_BACK}`,
  postAlternativeTradingAddressSaveAndBack,
);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, getAlternativeTradingAddress);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHANGE}`, postAlternativeTradingAddress);
insuranceBusinessRouter.get(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`,
  getAlternativeTradingAddress,
);
insuranceBusinessRouter.post(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE}`,
  postAlternativeTradingAddress,
);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_SAVE_AND_BACK}`, postNatureOfBusinessSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, postNatureOfBusiness);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE}`, postNatureOfBusiness);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHECK_AND_CHANGE}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHECK_AND_CHANGE}`, postNatureOfBusiness);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`, getTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`, postTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_SAVE_AND_BACK}`, postTurnoverSaveAndBack);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE}`, getTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE}`, postTurnover);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHECK_AND_CHANGE}`, getTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHECK_AND_CHANGE}`, postTurnover);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY}`, getTurnoverAlternativeCurrency);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY}`, postTurnoverAlternativeCurrency);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY_CHANGE}`, getTurnoverAlternativeCurrency);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY_CHANGE}`, postTurnoverAlternativeCurrency);
insuranceBusinessRouter.get(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`,
  getTurnoverAlternativeCurrency,
);
insuranceBusinessRouter.post(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`,
  postTurnoverAlternativeCurrency,
);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL}`, getCreditControl);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL}`, postCreditControl);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_SAVE_AND_BACK}`, postCreditControlSaveAndBack);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE}`, getCreditControl);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHANGE}`, postCreditControl);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE}`, getCreditControl);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL_CHECK_AND_CHANGE}`, postCreditControl);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS}`, getCheckYourAnswers);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS}`, postCheckYourAnswers);

export default insuranceBusinessRouter;
