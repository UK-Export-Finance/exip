import POLICY_ROOT from './root';

const ROOT = `${POLICY_ROOT}/another-company`;

const ANOTHER_COMPANY_ROUTES = {
  ANOTHER_COMPANY: ROOT,
  ANOTHER_COMPANY_SAVE_AND_BACK: `${ROOT}/save-and-go-back`,
  OTHER_COMPANY_DETAILS: `${POLICY_ROOT}/other-company-details`,
  OTHER_COMPANY_DETAILS_SAVE_AND_BACK: `${POLICY_ROOT}/other-company-details/save-and-go-back`,
};

export default ANOTHER_COMPANY_ROUTES;
