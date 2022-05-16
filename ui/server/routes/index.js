const express = require('express');
const CONSTANTS = require('../../../constants');
const getIndex = require('../controllers');
const companyBased = require('../controllers/company-based');

const router = express.Router();

router.get(CONSTANTS.ROUTES.BEFORE_YOU_START, getIndex);
router.get(CONSTANTS.ROUTES.COMPANY_BASED, companyBased);

module.exports = router;
