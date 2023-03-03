import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';
import { get as getWorkingWithBuyer, post as postWorkingWithBuyer } from '../../../controllers/insurance/your-buyer/working-with-buyer';

// @ts-ignore
const yourBuyerRouter = express.Router();
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, getWorkingWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, postWorkingWithBuyer);

export default yourBuyerRouter;
