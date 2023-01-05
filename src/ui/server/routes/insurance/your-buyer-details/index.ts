import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as getYourBuyerOrganisation, post as postYourBuyerOrganisation } from '../../../controllers/insurance/your-buyer/your-buyer-details';

// @ts-ignore
const yourBuyerRouter = express.Router();
yourBuyerRouter.get(YOUR_BUYER.YOUR_BUYER_DETAILS, getYourBuyerOrganisation);
yourBuyerRouter.post(YOUR_BUYER.YOUR_BUYER_DETAILS, postYourBuyerOrganisation);

export default yourBuyerRouter;
