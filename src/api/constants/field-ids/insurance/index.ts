import SHARED_ELIGIBILITY_FIELD_IDS from '../shared-eligibility';
import SHARED_FIELD_IDS from './shared';
import ACCOUNT from './account';
import POLICY from './policy';
import EXPORTER_BUSINESS from './business';
import YOUR_BUYER from './your-buyer';
import DECLARATIONS from './declarations';
import CHECK_YOUR_ANSWERS from './check-your-answers';

const INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    ...SHARED_FIELD_IDS,
    HAS_COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    COMPANIES_HOUSE_NUMBER: 'companyNumber',
    TOTAL_CONTRACT_VALUE: 'totalContractValue',
    TOTAL_CONTRACT_VALUE_ID: 'totalContractValueId',
    WANT_COVER_OVER_MAX_PERIOD: 'wantCoverOverMaxPeriod',
    COVER_PERIOD: 'coverPeriod',
    COVER_PERIOD_ID: 'coverPeriodId',
    ACCOUNT_TO_APPLY_ONLINE: 'alreadyHaveAnAccount',
  },
  ...SHARED_FIELD_IDS,
  SUBMISSION_DEADLINE: 'submissionDeadline',
  ACCOUNT,
  POLICY,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
};

export default INSURANCE_FIELD_IDS;
