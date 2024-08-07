import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as anotherCompanyGet, post as anotherCompanyPost } from '../../../../controllers/insurance/policy/another-company';
import { post as anotherCompanySaveAndBackPost } from '../../../../controllers/insurance/policy/another-company/save-and-back';
import { get as otherCompanyDetailsGet, post as otherCompanyDetailsPost } from '../../../../controllers/insurance/policy/other-company-details';
import { post as otherCompanyDetailsSaveAndBackPost } from '../../../../controllers/insurance/policy/other-company-details/save-and-back';

const {
  ANOTHER_COMPANY,
  ANOTHER_COMPANY_SAVE_AND_BACK,
  ANOTHER_COMPANY_CHANGE,
  ANOTHER_COMPANY_CHECK_AND_CHANGE,
  OTHER_COMPANY_DETAILS,
  OTHER_COMPANY_DETAILS_SAVE_AND_BACK,
  OTHER_COMPANY_DETAILS_CHANGE,
  OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
} = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${ANOTHER_COMPANY}`, anotherCompanyGet);
router.post(`/:referenceNumber${ANOTHER_COMPANY}`, anotherCompanyPost);
router.post(`/:referenceNumber${ANOTHER_COMPANY_SAVE_AND_BACK}`, anotherCompanySaveAndBackPost);
router.get(`/:referenceNumber${ANOTHER_COMPANY_CHANGE}`, anotherCompanyGet);
router.post(`/:referenceNumber${ANOTHER_COMPANY_CHANGE}`, anotherCompanyPost);
router.get(`/:referenceNumber${ANOTHER_COMPANY_CHECK_AND_CHANGE}`, anotherCompanyGet);
router.post(`/:referenceNumber${ANOTHER_COMPANY_CHECK_AND_CHANGE}`, anotherCompanyPost);

router.get(`/:referenceNumber${OTHER_COMPANY_DETAILS}`, otherCompanyDetailsGet);
router.post(`/:referenceNumber${OTHER_COMPANY_DETAILS}`, otherCompanyDetailsPost);
router.post(`/:referenceNumber${OTHER_COMPANY_DETAILS_SAVE_AND_BACK}`, otherCompanyDetailsSaveAndBackPost);
router.get(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHANGE}`, otherCompanyDetailsGet);
router.post(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHANGE}`, otherCompanyDetailsPost);
router.get(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, otherCompanyDetailsGet);
router.post(`/:referenceNumber${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, otherCompanyDetailsPost);

export default router;
