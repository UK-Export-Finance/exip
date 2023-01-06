import express from 'express';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  postCompanyDetailsSaveAndBack,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';
// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, getCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER}`, redirectToExitPage.noCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH}`, postCompaniesHouseSearch);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK}`, postCompanyDetailsSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, postCompanyDetails);

export default insuranceBusinessRouter;
