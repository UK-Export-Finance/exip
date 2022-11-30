import express from 'express';
import { ROUTES } from '../../../constants';

import { get as getCompanyDetails, postCompaniesHouseSearch } from '../../../controllers/insurance/business/company-details';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS, getCompanyDetails);
insuranceBusinessRouter.post(ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH, postCompaniesHouseSearch);

export default insuranceBusinessRouter;
