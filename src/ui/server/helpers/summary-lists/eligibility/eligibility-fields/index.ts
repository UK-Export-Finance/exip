import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import { InsuranceEligibility, SummaryListItemData } from '../../../../../types';

const { ELIGIBILITY: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
  TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ELIGIBILITY,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

const { MORE_THAN_2_YEARS } = COVER_PERIOD;
const { MORE_THAN_500K } = TOTAL_CONTRACT_VALUE;

/**
 * generateEligibilityFields
 * Create all your eligibility fields and values for the Insurance - Eligibility govukSummaryList
 * @param {InsuranceEligibility} answers exporter nature of your business
 * @returns {Object} All eligibility fields and values in an object structure for GOVUK summary list structure
 */
const generateEligibilityFields = (answers: InsuranceEligibility) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, BUYER_COUNTRY),
        data: answers,
        renderChangeLink: false,
      },
      answers[BUYER_COUNTRY].name,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, VALID_EXPORTER_LOCATION),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[VALID_EXPORTER_LOCATION]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
        data: answers,
        renderChangeLink: false,
      },
      FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, WANT_COVER_OVER_MAX_AMOUNT),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[TOTAL_CONTRACT_VALUE_ELIGIBILITY].valueId === MORE_THAN_500K.DB_ID),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, WANT_COVER_OVER_MAX_PERIOD),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[COVER_PERIOD_ELIGIBILITY].valueId === MORE_THAN_2_YEARS.DB_ID),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, OTHER_PARTIES_INVOLVED),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[OTHER_PARTIES_INVOLVED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, LETTER_OF_CREDIT),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[LETTER_OF_CREDIT]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, PRE_CREDIT_PERIOD),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[PRE_CREDIT_PERIOD]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANIES_HOUSE_NUMBER),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[COMPANIES_HOUSE_NUMBER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateEligibilityFields;
