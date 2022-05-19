const express = require('express');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');

const router = express.Router();

router.get(ROUTES.BEFORE_YOU_START, beforeYouStartController);

router.get(ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(ROUTES.COMPANY_BASED, companyBasedController.post);
router.get(ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

router.get(ROUTES.BUYER_BASED, buyerBasedController.get);
router.post(ROUTES.BUYER_BASED, buyerBasedController.post);
router.get(ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);

module.exports = router;
