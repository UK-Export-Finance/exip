import express from 'express';
import { ROUTES } from '../../../constants';

import {
  get as getCompaniesHouseNumber,
  redirectToExitPage,
  post as postCompaniesHouseNumber,
} from '../../../controllers/insurance/business/companies-house-number';

import { post as postCompaniesHouseNumberSaveAndBack } from '../../../controllers/insurance/business/companies-house-number/save-and-back';

import { get as getCompanyDetails, post as postCompanyDetails } from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import { get as getNatureOfBusiness, post as postNatureOfBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover, post as postTurnover } from '../../../controllers/insurance/business/turnover';
import { post as postTurnoverSaveAndBack } from '../../../controllers/insurance/business/turnover/save-and-back';

import { get as getBroker, post as postBroker } from '../../../controllers/insurance/business/broker';
import { post as postBrokerSaveAndBack } from '../../../controllers/insurance/business/broker/save-and-back';

import { get as getCheckYourAnswers, post as postCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';
import { post as postCheckYourAnswersSaveAndBack } from '../../../controllers/insurance/business/check-your-answers/save-and-back';

import { get as getCompaniesHouseError } from '../../../controllers/insurance/business/companies-house-number/companies-house-unavailable';

// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_ROOT}`, getCompaniesHouseNumber);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER}`, redirectToExitPage.noCompaniesHouseNumber);
insuranceBusinessRouter.post(
  `/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_SAVE_AND_BACK}`,
  postCompaniesHouseNumberSaveAndBack,
);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_ROOT}`, postCompaniesHouseNumber);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_CHANGE}`, getCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_CHANGE}`, postCompaniesHouseNumber);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE}`, getCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE}`, postCompaniesHouseNumber);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, getCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER}`, redirectToExitPage.noCompaniesHouseNumber);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_UNAVAILABLE}`, getCompaniesHouseError);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK}`, postCompanyDetailsSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, postCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, postCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHECK_AND_CHANGE}`, postCompanyDetails);

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

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT}`, getBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT}`, postBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_CHANGE}`, getBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_CHANGE}`, postBroker);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_CHECK_AND_CHANGE}`, getBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_CHECK_AND_CHANGE}`, postBroker);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS}`, getCheckYourAnswers);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS}`, postCheckYourAnswers);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`, postCheckYourAnswersSaveAndBack);

export default insuranceBusinessRouter;
