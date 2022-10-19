import { FIELD_IDS } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import { isSinglePolicyType, isMultiPolicyType } from '../policy-type';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapPeriodMonths from './map-period-months';
import mapPolicyLength from './map-policy-length';
import { SubmittedData } from '../../../types';

const {
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

const mapPolicyType = (answer: string) => {
  if (isSinglePolicyType(answer)) {
    return {
      [SINGLE_POLICY_TYPE]: {
        text: answer,
      },
    };
  }

  if (isMultiPolicyType(answer)) {
    return {
      [MULTI_POLICY_TYPE]: {
        text: answer,
      },
    };
  }

  return {};
};

const mapPercentageOfCover = (answer: number) => `${answer}%`;

const mapAnswersToContent = (answers: SubmittedData) => {
  const mapped = {
    [VALID_EXPORTER_LOCATION]: {
      text: SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION],
    },
    [BUYER_COUNTRY]: {
      text: mapCountry(answers[BUYER_COUNTRY]),
    },
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
      text: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
    },
    ...mapCost(answers),
    ...mapPolicyType(answers[POLICY_TYPE]),
    ...mapPolicyLength(answers),
    [PERCENTAGE_OF_COVER]: {
      text: mapPercentageOfCover(answers[PERCENTAGE_OF_COVER]),
    },
    [CREDIT_PERIOD]: {
      text: mapPeriodMonths(answers[CREDIT_PERIOD]),
    },
  };

  return mapped;
};

export { mapPolicyType, mapPercentageOfCover, mapAnswersToContent };
