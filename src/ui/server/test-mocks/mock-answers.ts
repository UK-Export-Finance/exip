import { FIELD_IDS, FIELD_VALUES } from '../constants';
import { mockCountryCanApplyForInsuranceOnline } from './mock-countries';
import { GBP } from './mock-currencies';
import { SubmittedDataQuoteEligibility } from '../../types';

const {
  ELIGIBILITY: {
    VALID_TYPE_OF_BUYER,
    VALID_EXPORTER_LOCATION,
    BUYER_COUNTRY,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    CONTRACT_VALUE,
    CURRENCY,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
  },
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const mockAnswers: SubmittedDataQuoteEligibility = {
  [VALID_TYPE_OF_BUYER]: true,
  [VALID_EXPORTER_LOCATION]: true,
  [BUYER_COUNTRY]: mockCountryCanApplyForInsuranceOnline,
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
  [CURRENCY]: GBP,
  [CONTRACT_VALUE]: 123456,
  [CREDIT_PERIOD]: 1,
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: 2,
  [PERCENTAGE_OF_COVER]: 90,
};

export default mockAnswers;
