import POLICY_ROOT from './root';

const ROOT = `${POLICY_ROOT}/type-of-policy`;

const TYPE_OF_POLICY_ROUTES = {
  TYPE_OF_POLICY: ROOT,
  TYPE_OF_POLICY_SAVE_AND_BACK: `${ROOT}/save-and-go-back`,
  TYPE_OF_POLICY_CHANGE: `${ROOT}/change`,
  TYPE_OF_POLICY_CHECK_AND_CHANGE: `${ROOT}/check-and-change`,
};

export default TYPE_OF_POLICY_ROUTES;
