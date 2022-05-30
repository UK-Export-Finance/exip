const express = require('express');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const finalDestinationController = require('../controllers/final-destination');
const ukContentPercentageController = require('../controllers/uk-content-pecentage');
const tellUsAboutYourDealController = require('../controllers/tell-us-about-your-deal');
const problemWithServiceController = require('../controllers/problem-with-service');

const router = express.Router();

router.get(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
router.post(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

router.get(ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

router.get(ROUTES.BUYER_BASED, buyerBasedController.get);
router.post(ROUTES.BUYER_BASED, buyerBasedController.post);
router.get(ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);

router.get(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.get);
router.post(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.post);

router.get(ROUTES.FINAL_DESTINATION, finalDestinationController.get);
router.post(ROUTES.FINAL_DESTINATION, finalDestinationController.post);

router.get(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.get);
router.post(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.post);

router.get(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.get);
router.post(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.post);

router.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);

module.exports = router;
