import POLICY_ROOT from './root';

const ROOT = `${POLICY_ROOT}/multiple-contract-policy`;

const EXPORT_VALUE_ROOT = `${ROOT}/export-value`;

const MULTIPLE_CONTRACT_POLICY_ROUTES = {
  MULTIPLE_CONTRACT_POLICY: ROOT,
  MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK: `${ROOT}/save-and-go-back`,
  MULTIPLE_CONTRACT_POLICY_CHANGE: `${ROOT}/change`,
  MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE: `${ROOT}/check-and-change`,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE: EXPORT_VALUE_ROOT,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK: `${EXPORT_VALUE_ROOT}/save-and-go-back`,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE: `${EXPORT_VALUE_ROOT}/change`,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE: `${EXPORT_VALUE_ROOT}/check-and-change`,
};

export default MULTIPLE_CONTRACT_POLICY_ROUTES;