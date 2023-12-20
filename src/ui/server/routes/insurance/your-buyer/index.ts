import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as buyerRootGet } from '../../../controllers/insurance/your-buyer';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

import { get as getWorkingWithBuyer, post as postWorkingWithBuyer } from '../../../controllers/insurance/your-buyer/working-with-buyer';
import { post as postWorkingWithBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/working-with-buyer/save-and-back';

import { get as getConnectionToTheBuyer, post as postConnectionToTheBuyer } from '../../../controllers/insurance/your-buyer/connection-to-the-buyer';
import { post as postConnectionToTheBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/connection-to-the-buyer/save-and-back';

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

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, getWorkingWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, postWorkingWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_SAVE_AND_BACK}`, postWorkingWithBuyerSaveAndBack);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_CHANGE}`, getWorkingWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_CHANGE}`, postWorkingWithBuyer);
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_CHECK_AND_CHANGE}`, getWorkingWithBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_CHECK_AND_CHANGE}`, postWorkingWithBuyer);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CONNECTION_TO_THE_BUYER}`, getConnectionToTheBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_TO_THE_BUYER}`, postConnectionToTheBuyer);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CONNECTION_TO_THE_BUYER_SAVE_AND_BACK}`, postConnectionToTheBuyerSaveAndBack);

yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default yourBuyerRouter;
