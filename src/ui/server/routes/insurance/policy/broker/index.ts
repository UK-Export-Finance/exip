import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getBroker, post as postBroker } from '../../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../../controllers/insurance/policy/broker/save-and-back';
import { get as getBrokerDetails, post as postBrokerDetails } from '../../../../controllers/insurance/policy/broker-details';
import { post as postBrokerDetailsSaveAndBack } from '../../../../controllers/insurance/policy/broker-details/save-and-back';
import { get as getBrokerConfirmAddress, post as postBrokerConfirmAddress } from '../../../../controllers/insurance/policy/broker-confirm-address';

const {
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK,
  BROKER_CHANGE,
  BROKER_CHECK_AND_CHANGE,
  BROKER_DETAILS_ROOT,
  BROKER_DETAILS_SAVE_AND_BACK,
  BROKER_DETAILS_CHANGE,
  BROKER_DETAILS_CHECK_AND_CHANGE,
  BROKER_CONFIRM_ADDRESS_ROOT,
} = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${BROKER_ROOT}`, getBroker);
router.post(`/:referenceNumber${BROKER_ROOT}`, postBroker);
router.post(`/:referenceNumber${BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);
router.get(`/:referenceNumber${BROKER_CHANGE}`, getBroker);
router.post(`/:referenceNumber${BROKER_CHANGE}`, postBroker);
router.get(`/:referenceNumber${BROKER_CHECK_AND_CHANGE}`, getBroker);
router.post(`/:referenceNumber${BROKER_CHECK_AND_CHANGE}`, postBroker);

router.get(`/:referenceNumber${BROKER_DETAILS_ROOT}`, getBrokerDetails);
router.post(`/:referenceNumber${BROKER_DETAILS_ROOT}`, postBrokerDetails);
router.post(`/:referenceNumber${BROKER_DETAILS_SAVE_AND_BACK}`, postBrokerDetailsSaveAndBack);
router.get(`/:referenceNumber${BROKER_DETAILS_CHANGE}`, getBrokerDetails);
router.post(`/:referenceNumber${BROKER_DETAILS_CHANGE}`, postBrokerDetails);
router.get(`/:referenceNumber${BROKER_DETAILS_CHECK_AND_CHANGE}`, getBrokerDetails);
router.post(`/:referenceNumber${BROKER_DETAILS_CHECK_AND_CHANGE}`, postBrokerDetails);

router.get(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, getBrokerConfirmAddress);
router.post(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, postBrokerConfirmAddress);

export default router;
