import express from 'express';
import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get as getYourBuyerDetails, post as postYourBuyerDetails } from '../../../controllers/insurance/your-buyer';

// @ts-ignore
const yourBuyerRouter = express.Router();
yourBuyerRouter.get(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getYourBuyerDetails);
yourBuyerRouter.post(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postYourBuyerDetails);

export default yourBuyerRouter;
