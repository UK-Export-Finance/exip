import { FIELD_IDS, GBP_CURRENCY_CODE, TOTAL_CONTRACT_VALUE } from '../constants';
import mockAnswers from './mock-answers';
import mockCountries from './mock-countries';
import mockCompany from './mock-company';
import { RequestSession } from '../../types';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    COVER_PERIOD,
    HAS_END_BUYER,
    HAS_COMPANIES_HOUSE_NUMBER,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    HAS_REVIEWED_ELIGIBILITY,
    IS_MEMBER_OF_A_GROUP,
    IS_PARTY_TO_CONSORTIUM,
    TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID,
    VALID_EXPORTER_LOCATION,
  },
} = FIELD_IDS.INSURANCE;

const mockSession = {
  submittedData: {
    quoteEligibility: {
      ...mockAnswers,
      [BUYER_COUNTRY]: {
        ...mockCountries[0],
        canApplyOnline: true,
      },
      currency: {
        name: 'UK Sterling',
        isoCode: GBP_CURRENCY_CODE,
      },
    },
    insuranceEligibility: {
      [HAS_COMPANIES_HOUSE_NUMBER]: true,
      [BUYER_COUNTRY]: {
        ...mockCountries[0],
        canApplyOnline: true,
      },
      company: mockCompany,
      [COVER_PERIOD]: true,
      [HAS_END_BUYER]: false,
      [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
      [HAS_REVIEWED_ELIGIBILITY]: true,
      [IS_MEMBER_OF_A_GROUP]: false,
      [IS_PARTY_TO_CONSORTIUM]: false,
      [TOTAL_CONTRACT_VALUE_FIELD_ID]: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
      [VALID_EXPORTER_LOCATION]: true,
    },
  },
} as RequestSession;

export default mockSession;
