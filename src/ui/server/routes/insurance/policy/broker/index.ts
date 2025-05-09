import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as getBroker, post as postBroker } from '../../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../../controllers/insurance/policy/broker/save-and-back';
import { get as getBrokerDetails, post as postBrokerDetails } from '../../../../controllers/insurance/policy/broker-details';
import { post as postBrokerDetailsSaveAndBack } from '../../../../controllers/insurance/policy/broker-details/save-and-back';
import { get as getBrokerAddresses, post as postBrokerAddresses } from '../../../../controllers/insurance/policy/broker-addresses';
import { post as postBrokerAddressesSaveAndBack } from '../../../../controllers/insurance/policy/broker-addresses/save-and-back';
import { get as getBrokerConfirmAddress, post as postBrokerConfirmAddress } from '../../../../controllers/insurance/policy/broker-confirm-address';
import { get as getBrokerZeroAddresses } from '../../../../controllers/insurance/policy/broker-zero-addresses';
import { get as getBrokerManualAddress, post as postBrokerManualAddress } from '../../../../controllers/insurance/policy/broker-manual-address';
import { post as postBrokerManualAddressSaveAndBack } from '../../../../controllers/insurance/policy/broker-manual-address/save-and-back';

const {
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK,
  BROKER_CHANGE,
  BROKER_CHECK_AND_CHANGE,
  BROKER_DETAILS_ROOT,
  BROKER_DETAILS_SAVE_AND_BACK,
  BROKER_DETAILS_CHANGE,
  BROKER_DETAILS_CHECK_AND_CHANGE,
  BROKER_ADDRESSES_ROOT,
  BROKER_ADDRESSES_SAVE_AND_BACK,
  BROKER_ADDRESSES_CHANGE,
  BROKER_ADDRESSES_CHECK_AND_CHANGE,
  BROKER_CONFIRM_ADDRESS_ROOT,
  BROKER_CONFIRM_ADDRESS_CHANGE,
  BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE,
  BROKER_ZERO_ADDRESSES_ROOT,
  BROKER_MANUAL_ADDRESS_ROOT,
  BROKER_MANUAL_ADDRESS_CHANGE,
  BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE,
  BROKER_MANUAL_ADDRESS_SAVE_AND_BACK,
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

router.get(`/:referenceNumber${BROKER_ADDRESSES_ROOT}`, getBrokerAddresses);
router.post(`/:referenceNumber${BROKER_ADDRESSES_ROOT}`, postBrokerAddresses);
router.post(`/:referenceNumber${BROKER_ADDRESSES_SAVE_AND_BACK}`, postBrokerAddressesSaveAndBack);
router.get(`/:referenceNumber${BROKER_ADDRESSES_CHANGE}`, getBrokerAddresses);
router.post(`/:referenceNumber${BROKER_ADDRESSES_CHANGE}`, postBrokerAddresses);
router.get(`/:referenceNumber${BROKER_ADDRESSES_CHECK_AND_CHANGE}`, getBrokerAddresses);
router.post(`/:referenceNumber${BROKER_ADDRESSES_CHECK_AND_CHANGE}`, postBrokerAddresses);

router.get(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, getBrokerConfirmAddress);
router.post(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_ROOT}`, postBrokerConfirmAddress);
router.get(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHANGE}`, getBrokerConfirmAddress);
router.post(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHANGE}`, postBrokerConfirmAddress);
router.get(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE}`, getBrokerConfirmAddress);
router.post(`/:referenceNumber${BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE}`, postBrokerConfirmAddress);

router.get(`/:referenceNumber${BROKER_ZERO_ADDRESSES_ROOT}`, getBrokerZeroAddresses);

router.get(`/:referenceNumber${BROKER_MANUAL_ADDRESS_ROOT}`, getBrokerManualAddress);
router.post(`/:referenceNumber${BROKER_MANUAL_ADDRESS_ROOT}`, postBrokerManualAddress);
router.post(`/:referenceNumber${BROKER_MANUAL_ADDRESS_SAVE_AND_BACK}`, postBrokerManualAddressSaveAndBack);
router.get(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHANGE}`, getBrokerManualAddress);
router.post(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHANGE}`, postBrokerManualAddress);
router.get(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`, getBrokerManualAddress);
router.post(`/:referenceNumber${BROKER_MANUAL_ADDRESS_CHECK_AND_CHANGE}`, postBrokerManualAddress);

export default router;
