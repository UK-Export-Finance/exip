import SHARED_ELIGIBILITY_FIELD_IDS from '../shared-eligibility';
import ACCOUNT from './account';
import POLICY_AND_EXPORTS from './policy-and-exports';
import EXPORTER_BUSINESS from './business';
import YOUR_BUYER from './your-buyer';
import DECLARATIONS from './declarations';
import CHECK_YOUR_ANSWERS from './check-your-answers';

const INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    WANT_COVER_OVER_MAX_AMOUNT: 'wantCoverOverMaxAmount',
    WANT_COVER_OVER_MAX_PERIOD: 'wantCoverOverMaxPeriod',
    OTHER_PARTIES_INVOLVED: 'otherPartiesInvolved',
    LETTER_OF_CREDIT: 'paidByLetterOfCredit',
    PRE_CREDIT_PERIOD: 'needPreCreditPeriodCover',
    COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    ACCOUNT_TO_APPLY_ONLINE: 'alreadyHaveAnAccount',
  },
  SUBMISSION_DEADLINE: 'submissionDeadline',
  ACCOUNT,
  POLICY_AND_EXPORTS,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
};

export default INSURANCE_FIELD_IDS;
