const express = require('express');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');

const router = express.Router();

router.get(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);

router.get(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

router.get(CONSTANTS.ROUTES.BUYER_BASED, buyerBasedController.get);
router.post(CONSTANTS.ROUTES.BUYER_BASED, buyerBasedController.post);
router.get(CONSTANTS.ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);

module.exports = router;
