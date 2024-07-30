import { SHARED_ELIGIBILITY_FIELD_IDS } from '../shared-eligibility';
import SHARED_FIELD_IDS from './shared';
import { ACCOUNT } from './account';
import { POLICY } from './policy';
import { EXPORTER_BUSINESS } from './business';
import { EXPORT_CONTRACT } from './export-contract';
import { YOUR_BUYER } from './your-buyer';
import { DECLARATIONS } from './declarations';

export const INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    ...SHARED_FIELD_IDS,
    HAS_COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    COMPANIES_HOUSE_NUMBER: 'companyNumber',
    TOTAL_CONTRACT_VALUE: 'totalContractValue',
    TOTAL_CONTRACT_VALUE_ID: 'totalContractValueId',
    COVER_PERIOD: 'coverPeriod',
    COVER_PERIOD_ID: 'coverPeriodId',
    HAS_END_BUYER: 'hasEndBuyer',
    HAVE_AN_ACCOUNT: 'haveAnAccount',
    HAS_REVIEWED_ELIGIBILITY: 'hasReviewedEligibility',
    IS_PARTY_TO_CONSORTIUM: 'isPartyToConsortium',
    IS_MEMBER_OF_A_GROUP: 'isMemberOfAGroup',
  },
  ...SHARED_FIELD_IDS,
  CURRENCY: {
    CURRENCY_CODE: 'currencyCode',
    ALTERNATIVE_CURRENCY_CODE: 'alternativeCurrencyCode',
  },
  SUBMISSION_DEADLINE: 'submissionDeadline',
  MIGRATED_FROM_V1_TO_V2: 'migratedV1toV2',
  ACCOUNT,
  POLICY,
  EXPORTER_BUSINESS,
  EXPORT_CONTRACT,
  YOUR_BUYER,
  DECLARATIONS,
};
