const express = require('express');
const { ROUTES } = require('../constants');
const guidanceController = require('../controllers/guidance');
const beforeYouStartController = require('../controllers/before-you-start');
const buyerBasedController = require('../controllers/buyer-country');
const companyBasedController = require('../controllers/company-based');
const canGetPrivateInsuranceController = require('../controllers/can-get-private-insurance');
const ukGoodsOrServicesController = require('../controllers/uk-goods-or-services');
const tellUsAboutYourPolicyController = require('../controllers/tell-us-about-your-policy');
const checkYourAnswersController = require('../controllers/check-your-answers');
const cannotObtainCoverController = require('../controllers/cannot-obtain-cover');
const yourQuoteController = require('../controllers/your-quote');
const problemWithServiceController = require('../controllers/problem-with-service');

const router = express.Router();
router.get(ROUTES.GUIDANCE, guidanceController);

router.get(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
router.post(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

router.get(ROUTES.BUYER_COUNTRY, buyerBasedController.get);
router.post(ROUTES.BUYER_COUNTRY, buyerBasedController.post);
router.get(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedController.get);
router.post(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedController.post);

router.get(ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.post);

router.get(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceController.get);
router.post(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceController.post);
router.get(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceController.get);
router.post(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceController.post);

router.get(ROUTES.UK_GOODS_OR_SERVICES, ukGoodsOrServicesController.get);
router.post(ROUTES.UK_GOODS_OR_SERVICES, ukGoodsOrServicesController.post);
router.get(ROUTES.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesController.get);
router.post(ROUTES.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesController.post);

router.get(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyController.get);
router.post(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyController.post);
router.get(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyController.get);
router.post(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyController.post);

router.get(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.get);
router.post(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.post);

router.get(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverController);

router.get(ROUTES.YOUR_QUOTE, yourQuoteController);

router.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);

module.exports = router;
