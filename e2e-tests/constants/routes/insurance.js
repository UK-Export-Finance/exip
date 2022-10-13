const INSURANCE = '/insurance';
const ELIGIBILIY = '/eligibility';

const INSURANCE_ROUTES = {
  START: `${INSURANCE}/start`,
  ELIGIBILITY: {
    CHECK_IF_ELIGIBLE: `${INSURANCE}${ELIGIBILIY}/check-if-eligible`,
  },
};

export default INSURANCE_ROUTES;
