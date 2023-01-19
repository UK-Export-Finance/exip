import { SHARED_ELIGIBILITY_FIELD_IDS } from '../shared-eligibility';
import { POLICY_AND_EXPORTS } from './policy-and-exports';
import { EXPORTER_BUSINESS } from './exporter-business';
import { YOUR_BUYER } from './your-buyer';

export const INSURANCE_FIELD_IDS = {
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
  POLICY_AND_EXPORTS,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
};
