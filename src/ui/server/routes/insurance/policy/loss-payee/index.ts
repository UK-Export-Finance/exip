import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getLossPayee, post as postLossPayee } from '../../../../controllers/insurance/policy/loss-payee';
import { post as postLossPayeeSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee/save-and-back';
import {
  get as getLossPayeeFinancialDetailsUk,
  post as postLossPayeeFinancialDetailsUk,
} from '../../../../controllers/insurance/policy/loss-payee-financial-details-uk';
import { get as getLossPayeeDetails, post as postLossPayeeDetails } from '../../../../controllers/insurance/policy/loss-payee-details';
import { post as postLossPayeeDetailsSaveAndBack } from '../../../../controllers/insurance/policy/loss-payee-details/save-and-back';
import {
  get as getLossPayeeFinancialInternational,
  post as postLossPayeeFinancialInternational,
} from '../../../../controllers/insurance/policy/loss-payee-financial-details-international';

const {
  LOSS_PAYEE_ROOT,
  LOSS_PAYEE_CHANGE,
  LOSS_PAYEE_CHECK_AND_CHANGE,
  LOSS_PAYEE_SAVE_AND_BACK,
  LOSS_PAYEE_DETAILS_ROOT,
  LOSS_PAYEE_DETAILS_CHANGE,
  LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE,
  LOSS_PAYEE_DETAILS_SAVE_AND_BACK,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
} = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${LOSS_PAYEE_ROOT}`, getLossPayee);
router.post(`/:referenceNumber${LOSS_PAYEE_ROOT}`, postLossPayee);
router.get(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, getLossPayee);
router.post(`/:referenceNumber${LOSS_PAYEE_CHANGE}`, postLossPayee);
router.get(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, getLossPayee);
router.post(`/:referenceNumber${LOSS_PAYEE_CHECK_AND_CHANGE}`, postLossPayee);
router.post(`/:referenceNumber${LOSS_PAYEE_SAVE_AND_BACK}`, postLossPayeeSaveAndBack);

router.get(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, getLossPayeeDetails);
router.post(`/:referenceNumber${LOSS_PAYEE_DETAILS_ROOT}`, postLossPayeeDetails);
router.post(`/:referenceNumber${LOSS_PAYEE_DETAILS_SAVE_AND_BACK}`, postLossPayeeDetailsSaveAndBack);
router.get(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, getLossPayeeDetails);
router.post(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHANGE}`, postLossPayeeDetails);
router.get(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, getLossPayeeDetails);
router.post(`/:referenceNumber${LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE}`, postLossPayeeDetails);

router.get(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, getLossPayeeFinancialDetailsUk);
router.post(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, postLossPayeeFinancialDetailsUk);

router.get(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, getLossPayeeFinancialInternational);
router.post(`/:referenceNumber${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, postLossPayeeFinancialInternational);

export default router;
