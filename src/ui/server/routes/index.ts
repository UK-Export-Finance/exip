import express from 'express';
import { ROUTES } from '../constants';
import rootGet from '../controllers/root';
import { get as buyerBasedGet, post as buyerBasedPost } from '../controllers/buyer-country/index';
import { get as companyBasedGet, post as companyBasedPost } from '../controllers/company-based';
import { get as canGetPrivateInsuranceGet, post as canGetPrivateInsurancePost } from '../controllers/can-get-private-insurance';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../controllers/uk-goods-or-services';
import { get as policyTypeGet, post as policyTypePost } from '../controllers/policy-type';
import { get as tellUsAboutYourPolicyGet, post as tellUsAboutYourPolicyPost } from '../controllers/tell-us-about-your-policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../controllers/check-your-answers';
import cannotObtainCoverGet from '../controllers/cannot-obtain-cover';
import yourQuoteGet from '../controllers/your-quote';
import cookiesGet from '../controllers/cookies';
import problemWithServiceGet from '../controllers/problem-with-service';

// @ts-ignore
const router = express.Router();

router.get(ROUTES.ROOT, rootGet);

router.get(ROUTES.BUYER_COUNTRY, buyerBasedGet);
router.post(ROUTES.BUYER_COUNTRY, buyerBasedPost);
router.get(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedGet);
router.post(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedPost);

router.get(ROUTES.COMPANY_BASED, companyBasedGet);
router.post(ROUTES.COMPANY_BASED, companyBasedPost);
router.get(ROUTES.COMPANY_BASED_CHANGE, companyBasedGet);
router.post(ROUTES.COMPANY_BASED_CHANGE, companyBasedPost);

router.get(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceGet);
router.post(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsurancePost);
router.get(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceGet);
router.post(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsurancePost);

router.get(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
router.post(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);
router.get(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesGet);
router.post(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesPost);

router.get(ROUTES.POLICY_TYPE, policyTypeGet);
router.post(ROUTES.POLICY_TYPE, policyTypePost);
router.get(ROUTES.POLICY_TYPE_CHANGE, policyTypeGet);
router.post(ROUTES.POLICY_TYPE_CHANGE, policyTypePost);

router.get(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyGet);
router.post(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyPost);
router.get(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyGet);
router.post(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyPost);

router.get(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
router.post(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

router.get(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverGet);

router.get(ROUTES.YOUR_QUOTE, yourQuoteGet);

router.get(ROUTES.COOKIES, cookiesGet);

router.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);

export default router;
