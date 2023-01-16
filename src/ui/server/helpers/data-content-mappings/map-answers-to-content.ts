import { FIELD_IDS } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import { isSinglePolicyType, isMultiPolicyType } from '../policy-type';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapMonthString from './map-month-string';
import mapPolicyLength from './map-policy-length';
import { SubmittedDataInsuranceEligibility, SubmittedDataQuoteEligibility } from '../../../types';

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

/**
 * mapPolicyType
 * Map policy type into an object for GOV summary list structure
 * @param {String} Policy type answer
 * @returns {Object} Answer in an object
 */
const mapPolicyType = (answer: string) => {
  if (isSinglePolicyType(answer)) {
    return {
      [SINGLE_POLICY_TYPE]: answer,
    };
  }

  if (isMultiPolicyType(answer)) {
    return {
      [MULTI_POLICY_TYPE]: answer,
    };
  }

  return {};
};

/**
 * mapPercentageOfCover
 * Map percentage of cover answer to a string with percentage symbol for GOVUK summary list structure
 * @param {Number} Percentage of cover answer
 * @returns {String} Percentage of cover with percentage symbol
 */
const mapPercentageOfCover = (answer: number) => `${answer}%`;

/**
 * mapAnswersToContent
 * Map all answers/submitted data into an object structure for GOVUK summary list structure
 * @param {Object} All submitted data
 * @returns {Object} All answers in an object structure with 'text' field
 */
const mapAnswersToContent = (answers: SubmittedDataQuoteEligibility | SubmittedDataInsuranceEligibility) => {
  const mapped = {
    [VALID_EXPORTER_LOCATION]: SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION],
    [BUYER_COUNTRY]: mapCountry(answers[BUYER_COUNTRY]),
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
    ...mapCost(answers),
    ...mapPolicyType(answers[POLICY_TYPE]),
    ...mapPolicyLength(answers),
    [PERCENTAGE_OF_COVER]: mapPercentageOfCover(answers[PERCENTAGE_OF_COVER]),
    [CREDIT_PERIOD]: mapMonthString(answers[CREDIT_PERIOD]),
  };

  return mapped;
};

export { mapPolicyType, mapPercentageOfCover, mapAnswersToContent };
