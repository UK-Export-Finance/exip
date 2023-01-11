import SHARED_ELIGIBILITY_FIELD_IDS from '../shared-eligibility';
import EXPORTER_BUSINESS from './exporter-business';
import POLICY_AND_EXPORTS from './policy-and-exports';
import { FIELDS } from '../../../content-strings/fields/insurance/your-buyer';

const YOUR_BUYER_FILEDS = FIELDS.YOUR_BUYER;

const INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    WANT_COVER_OVER_MAX_AMOUNT: 'wantCoverOverMaxAmount',
    WANT_COVER_OVER_MAX_PERIOD: 'wantCoverOverMaxPeriod',
    OTHER_PARTIES_INVOLVED: 'otherPartiesInvolved',
    LETTER_OF_CREDIT: 'paidByLetterOfCredit',
    PRE_CREDIT_PERIOD: 'needPreCreditPeriodCover',
    COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
  },
  SUBMISSION_DEADLINE: 'submissionDeadline',
  EXPORTER_BUSINESS,
  POLICY_AND_EXPORTS,
  YOUR_BUYER_FILEDS,
};

export default INSURANCE_FIELD_IDS;
