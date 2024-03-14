import POLICY_ROOT from './root';

const ROOT = `${POLICY_ROOT}/broker`;
const BROKER_DETAILS_ROOT = `${POLICY_ROOT}/broker-details`;
const BROKER_CONFIRM_ADDRESS_ROOT = `${POLICY_ROOT}/broker-confirm-address`;

const BROKER_ROUTES = {
  BROKER_ROOT: ROOT,
  BROKER_SAVE_AND_BACK: `${ROOT}/save-and-back`,
  BROKER_CHANGE: `${ROOT}/change`,
  BROKER_CHECK_AND_CHANGE: `${ROOT}/check-and-change`,
  BROKER_DETAILS_ROOT,
  BROKER_DETAILS_SAVE_AND_BACK: `${BROKER_DETAILS_ROOT}/save-and-back`,
  BROKER_DETAILS_CHANGE: `${BROKER_DETAILS_ROOT}/change`,
  BROKER_DETAILS_CHECK_AND_CHANGE: `${BROKER_DETAILS_ROOT}/check-and-change`,
  BROKER_CONFIRM_ADDRESS_ROOT,
};

export default BROKER_ROUTES;
