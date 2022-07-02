const express = require('express');
const { ROUTES } = require('../constants');
const guidanceController = require('../controllers/guidance');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const buyerBasedController = require('../controllers/buyer-based');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const ukContentPercentageController = require('../controllers/uk-content-pecentage');
const tellUsAboutYourPolicyController = require('../controllers/tell-us-about-your-policy');
const checkYourAnswersController = require('../controllers/check-your-answers');
const cannotObtainCoverController = require('../controllers/cannot-obtain-cover');
const yourQuoteController = require('../controllers/your-quote');
const problemWithServiceController = require('../controllers/problem-with-service');

const router = express.Router();
router.get(ROUTES.GUIDANCE, guidanceController);

router.get(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
router.post(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

router.get(ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.post);

router.get(ROUTES.BUYER_BASED, buyerBasedController.get);
router.post(ROUTES.BUYER_BASED, buyerBasedController.post);
router.get(ROUTES.BUYER_BASED_CHANGE, buyerBasedController.get);
router.post(ROUTES.BUYER_BASED_CHANGE, buyerBasedController.post);

router.get(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.get);
router.post(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.post);
router.get(ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE, triedToObtainCoverController.get);
router.post(ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE, triedToObtainCoverController.post);

router.get(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.get);
router.post(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.post);
router.get(ROUTES.UK_CONTENT_PERCENTAGE_CHANGE, ukContentPercentageController.get);
router.post(ROUTES.UK_CONTENT_PERCENTAGE_CHANGE, ukContentPercentageController.post);

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
