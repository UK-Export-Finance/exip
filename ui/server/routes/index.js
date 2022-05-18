const express = require('express');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');

const router = express.Router();

router.get(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);

router.get(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.get);
router.post(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.post);

module.exports = router;
