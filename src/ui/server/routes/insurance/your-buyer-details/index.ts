import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
// import { ROUTES } from '../../../constants';
import { get as getYourBuyerOrganisation } from '../../../controllers/insurance/your-buyer/your-buyer-details';

// @ts-ignore
const yourBuyerRouter = express.Router();
// eslint-disable-next-line no-console
console.log(`step 1${YOUR_BUYER.YOUR_BUYER_DETAILS}`);
yourBuyerRouter.get(YOUR_BUYER.YOUR_BUYER_DETAILS, getYourBuyerOrganisation);

export default yourBuyerRouter;
