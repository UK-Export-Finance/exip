import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

// @ts-ignore
const yourBuyerRouter = express.Router();
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);

export default yourBuyerRouter;
