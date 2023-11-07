import { FIELD_IDS } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapMonthString from './map-month-string';
import mapPolicyLength from './map-policy-length';
import { SubmittedDataInsuranceEligibility, SubmittedDataQuoteEligibility } from '../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CREDIT_PERIOD, PERCENTAGE_OF_COVER, HAS_MINIMUM_UK_GOODS_OR_SERVICES, VALID_EXPORTER_LOCATION },
  POLICY_TYPE,
} = FIELD_IDS;

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
    [POLICY_TYPE]: answers[POLICY_TYPE],
    ...mapCost(answers),
    ...mapPolicyLength(answers),
    [PERCENTAGE_OF_COVER]: mapPercentageOfCover(answers[PERCENTAGE_OF_COVER]),
    [CREDIT_PERIOD]: mapMonthString(answers[CREDIT_PERIOD]),
  };

  return mapped;
};

export { mapPercentageOfCover, mapAnswersToContent };
