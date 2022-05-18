const express = require('express');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');

const router = express.Router();

router.get(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);

router.get(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.post);

router.get(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

module.exports = router;
