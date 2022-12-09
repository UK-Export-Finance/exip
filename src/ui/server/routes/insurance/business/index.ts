import express from 'express';
import { ROUTES } from '../../../constants';

import { get as getCompanyDetails, postCompaniesHouseSearch, post as postCompanyDetails } from '../../../controllers/insurance/business/company-details';
// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
insuranceBusinessRouter.post(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);
insuranceBusinessRouter.post(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, postCompanyDetails);

export default insuranceBusinessRouter;
