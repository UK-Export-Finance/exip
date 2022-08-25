import express from 'express';
import { ROUTES } from '../../constants';
import { get as buyerBasedGet, post as buyerBasedPost } from '../../controllers/quote/buyer-country/index';
import { get as buyerBodyGet, post as buyerBodyPost } from '../../controllers/quote/buyer-body/index';
import { get as companyBasedGet, post as companyBasedPost } from '../../controllers/quote/company-based';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../controllers/quote/uk-goods-or-services';
import { get as policyTypeGet, post as policyTypePost } from '../../controllers/quote/policy-type';
import { get as tellUsAboutYourPolicyGet, post as tellUsAboutYourPolicyPost } from '../../controllers/quote/tell-us-about-your-policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../controllers/quote/check-your-answers';
import cannotObtainCoverGet from '../../controllers/quote/cannot-obtain-cover';
import getAQuoteByEmailGet from '../../controllers/quote/get-a-quote-by-email';
import yourQuoteGet from '../../controllers/quote/your-quote';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../controllers/quote/need-to-start-again';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const quoteRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

quoteRouter.get(ROUTES.QUOTE.BUYER_COUNTRY, buyerBasedGet);
quoteRouter.post(ROUTES.QUOTE.BUYER_COUNTRY, buyerBasedPost);
quoteRouter.get(ROUTES.QUOTE.BUYER_COUNTRY_CHANGE, buyerBasedGet);
quoteRouter.post(ROUTES.QUOTE.BUYER_COUNTRY_CHANGE, buyerBasedPost);

quoteRouter.get(ROUTES.QUOTE.BUYER_BODY, buyerBodyGet);
quoteRouter.post(ROUTES.QUOTE.BUYER_BODY, buyerBodyPost);

quoteRouter.get(ROUTES.QUOTE.COMPANY_BASED, companyBasedGet);
quoteRouter.post(ROUTES.QUOTE.COMPANY_BASED, companyBasedPost);
quoteRouter.get(ROUTES.QUOTE.COMPANY_BASED_CHANGE, companyBasedGet);
quoteRouter.post(ROUTES.QUOTE.COMPANY_BASED_CHANGE, companyBasedPost);

quoteRouter.get(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
quoteRouter.post(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);
quoteRouter.get(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesGet);
quoteRouter.post(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesPost);

quoteRouter.get(ROUTES.QUOTE.POLICY_TYPE, policyTypeGet);
quoteRouter.post(ROUTES.QUOTE.POLICY_TYPE, policyTypePost);
quoteRouter.get(ROUTES.QUOTE.POLICY_TYPE_CHANGE, policyTypeGet);
quoteRouter.post(ROUTES.QUOTE.POLICY_TYPE_CHANGE, policyTypePost);

quoteRouter.get(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyGet);
quoteRouter.post(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyPost);
quoteRouter.get(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyGet);
quoteRouter.post(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyPost);

quoteRouter.get(ROUTES.QUOTE.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
quoteRouter.post(ROUTES.QUOTE.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

quoteRouter.get(ROUTES.QUOTE.CANNOT_OBTAIN_COVER, cannotObtainCoverGet);

quoteRouter.get(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL, getAQuoteByEmailGet);

quoteRouter.get(ROUTES.QUOTE.YOUR_QUOTE, yourQuoteGet);

quoteRouter.get(ROUTES.QUOTE.NEED_TO_START_AGAIN, needToStartAgainGet);
quoteRouter.post(ROUTES.QUOTE.NEED_TO_START_AGAIN, needToStartAgainPost);

export default quoteRouter;
