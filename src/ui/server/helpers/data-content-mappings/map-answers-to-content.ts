import { FIELD_IDS } from '../../constants';
import { SUMMARY_ANSWERS } from '../../content-strings';
import mapCountry from './map-country';
import mapCost from './map-cost';
import mapMonthString from './map-month-string';
import mapPolicyLength from './map-policy-length';
import { SubmittedDataQuoteEligibility, Country } from '../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CREDIT_PERIOD, PERCENTAGE_OF_COVER, HAS_MINIMUM_UK_GOODS_OR_SERVICES, VALID_EXPORTER_LOCATION },
  POLICY_TYPE,
} = FIELD_IDS;

/**
 * mapPercentageOfCover
 * Map percentage of cover answer to a string with percentage symbol for GOVUK summary list structure
 * @param {number} Percentage of cover answer
 * @returns {string} Percentage of cover with percentage symbol
 */
const mapPercentageOfCover = (answer: number) => `${answer}%`;

/**
 * mapAnswersToContent
 * Map all answers/submitted data into an object structure for GOVUK summary list structure
 * @param {object} All submitted data
 * @returns {object} All answers in an object structure with 'text' field
 */
const mapAnswersToContent = (answers: SubmittedDataQuoteEligibility) => {
  const mapped = {
    [VALID_EXPORTER_LOCATION]: SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION],
    [BUYER_COUNTRY]: mapCountry(answers[BUYER_COUNTRY] as Country),
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
    [POLICY_TYPE]: answers[POLICY_TYPE],
    ...mapCost(answers),
    ...mapPolicyLength(answers),
    [PERCENTAGE_OF_COVER]: mapPercentageOfCover(Number(answers[PERCENTAGE_OF_COVER])),
    [CREDIT_PERIOD]: mapMonthString(Number(answers[CREDIT_PERIOD])),
  };

  return mapped;
};

export { mapPercentageOfCover, mapAnswersToContent };
