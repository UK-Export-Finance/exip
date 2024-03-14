import POLICY_ROOT from './root';

const ROOT = `${POLICY_ROOT}/pre-credit-period`;

const PRE_CREDIT_PERIOD_ROUTES = {
  PRE_CREDIT_PERIOD: ROOT,
  PRE_CREDIT_PERIOD_SAVE_AND_BACK: `${ROOT}/save-and-go-back`,
  PRE_CREDIT_PERIOD_CHANGE: `${ROOT}/change`,
  PRE_CREDIT_PERIOD_CHECK_AND_CHANGE: `${ROOT}/check-and-change`,
};

export default PRE_CREDIT_PERIOD_ROUTES;
