import { FIELD_IDS, GBP_CURRENCY_CODE, TOTAL_CONTRACT_VALUE } from '../constants';
import mockAnswers from './mock-answers';
import mockCountries from './mock-countries';
import mockCompany from './mock-company';
import { RequestSession } from '../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CURRENCY, VALID_EXPORTER_LOCATION, HAS_MINIMUM_UK_GOODS_OR_SERVICES },
} = FIELD_IDS;

const mockSession = {
  submittedData: {
    quoteEligibility: {
      ...mockAnswers,
      [BUYER_COUNTRY]: {
        ...mockCountries[0],
        canApplyOnline: true,
      },
      [CURRENCY]: {
        name: 'UK Sterling',
        isoCode: GBP_CURRENCY_CODE,
      },
    },
    insuranceEligibility: {
      [VALID_EXPORTER_LOCATION]: true,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_COMPANIES_HOUSE_NUMBER]: true,
      company: mockCompany,
      [BUYER_COUNTRY]: {
        ...mockCountries[0],
        canApplyOnline: true,
      },
      [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_END_BUYER]: false,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE]: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD]: false,
    },
  },
} as RequestSession;

export default mockSession;
