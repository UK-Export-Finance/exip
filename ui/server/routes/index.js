const express = require('express');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const ukContentPercentageController = require('../controllers/uk-content-pecentage');
const tellUsAboutYourDealController = require('../controllers/tell-us-about-your-deal');
const checkYourAnswersController = require('../controllers/check-your-answers');
const cannotObtainCoverController = require('../controllers/cannot-obtain-cover');
const problemWithServiceController = require('../controllers/problem-with-service');

const router = express.Router();

router.get(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
router.post(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

router.get(ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

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

router.get(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.get);
router.post(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.post);
router.get(ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE, tellUsAboutYourDealController.get);
router.post(ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE, tellUsAboutYourDealController.post);

router.get(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.get);
router.post(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.post);

router.get(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverController);

router.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);

module.exports = router;
