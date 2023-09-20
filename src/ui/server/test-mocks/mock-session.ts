import { FIELD_IDS, GBP_CURRENCY_CODE } from '../constants';
import mockAnswers from './mock-answers';
import mockCountries from './mock-countries';
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
      [BUYER_COUNTRY]: {
        ...mockCountries[0],
        canApplyOnline: true,
      },
      [VALID_EXPORTER_LOCATION]: true,
      [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT]: false,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD]: false,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED]: false,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT]: false,
      [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: true,
    },
  },
} as RequestSession;

export default mockSession;
