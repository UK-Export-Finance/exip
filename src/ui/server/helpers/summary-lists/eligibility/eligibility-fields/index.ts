import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import mapTotalContractValueField from '../../../mappings/map-total-contract-value';
import { InsuranceEligibility, SummaryListItemData } from '../../../../../types';

const { ELIGIBILITY: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
  COVER_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  TOTAL_CONTRACT_VALUE,
} = FIELD_IDS;

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
        field: getFieldById(FIELDS_ELIGIBILITY, TOTAL_CONTRACT_VALUE),
        data: answers,
        renderChangeLink: false,
      },
      mapTotalContractValueField(answers[TOTAL_CONTRACT_VALUE].valueId),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COVER_PERIOD),
        data: answers,
        renderChangeLink: false,
      },
      mapYesNoField(answers[COVER_PERIOD_ELIGIBILITY].valueId === 'TODO'),
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
