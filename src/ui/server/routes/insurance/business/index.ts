import express from 'express';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import { get as getNatureOfBusiness, post as postNatureofBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover } from '../../../controllers/insurance/business/turnover';

// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, getCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER}`, redirectToExitPage.noCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH}`, postCompaniesHouseSearch);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK}`, postCompanyDetailsSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, postCompanyDetails);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_SAVE_AND_BACK}`, postNatureOfBusinessSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, postNatureofBusiness);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`, getTurnover);

export default insuranceBusinessRouter;
