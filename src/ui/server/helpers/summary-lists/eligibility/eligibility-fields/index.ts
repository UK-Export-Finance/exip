import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import mapTotalContractValueField from '../../../mappings/map-total-contract-value';
import mapCoverPeriodField from '../../../mappings/map-cover-period';
import { Company, InsuranceEligibility, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const { ELIGIBILITY: FIELD_IDS, COMPANIES_HOUSE } = INSURANCE_FIELD_IDS;

const {
  COVER_PERIOD,
  HAS_COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  TOTAL_CONTRACT_VALUE,
  HAS_END_BUYER,
} = FIELD_IDS;

const { COMPANY_NUMBER, COMPANY_NAME } = COMPANIES_HOUSE;

const {
  ELIGIBILITY: {
    EXPORTER_LOCATION_CHANGE,
    COMPANIES_HOUSE_NUMBER_CHANGE,
    ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
    BUYER_COUNTRY_CHANGE,
    TOTAL_VALUE_INSURED_CHANGE,
    COVER_PERIOD_CHANGE,
    UK_GOODS_OR_SERVICES_CHANGE,
    END_BUYER_CHANGE,
  },
} = INSURANCE_ROUTES;

const isCheckAndChange = false;
const referenceNumber = undefined;
const checkAndChangeLink = '';
const isInsuranceEligibility = true;

/**
 * generateEligibilityFields
 * Create all your eligibility fields and values for the Insurance - Eligibility govukSummaryList
 * @param {InsuranceEligibility} answers exporter nature of your business
 * @returns {Object} All eligibility fields and values in an object structure for GOVUK summary list structure
 */
const generateEligibilityFields = (answers: InsuranceEligibility) => {
  let company = {} as Company;

  if (answers.company) {
    ({ company } = answers);
  }

  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, VALID_EXPORTER_LOCATION),
        data: answers,
        href: generateChangeLink(
          EXPORTER_LOCATION_CHANGE,
          checkAndChangeLink,
          `#${VALID_EXPORTER_LOCATION}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[VALID_EXPORTER_LOCATION]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_COMPANIES_HOUSE_NUMBER),
        data: answers,
        href: generateChangeLink(
          COMPANIES_HOUSE_NUMBER_CHANGE,
          checkAndChangeLink,
          `#${HAS_COMPANIES_HOUSE_NUMBER}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_COMPANIES_HOUSE_NUMBER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANY_NUMBER),
        data: answers,
        href: generateChangeLink(
          ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
          checkAndChangeLink,
          `#${COMPANY_NUMBER}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      company[COMPANY_NUMBER],
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANY_NAME),
        data: answers,
        renderChangeLink: false,
      },
      company[COMPANY_NAME],
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, BUYER_COUNTRY),
        data: answers,
        href: generateChangeLink(
          BUYER_COUNTRY_CHANGE,
          checkAndChangeLink,
          `#${BUYER_COUNTRY}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      answers[BUYER_COUNTRY].name,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, TOTAL_CONTRACT_VALUE),
        data: answers,
        href: generateChangeLink(
          TOTAL_VALUE_INSURED_CHANGE,
          checkAndChangeLink,
          `#${TOTAL_CONTRACT_VALUE}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      mapTotalContractValueField(answers[TOTAL_CONTRACT_VALUE]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COVER_PERIOD),
        data: answers,
        href: generateChangeLink(COVER_PERIOD_CHANGE, checkAndChangeLink, `#${COVER_PERIOD}-label`, referenceNumber, isCheckAndChange, isInsuranceEligibility),
        renderChangeLink: true,
      },
      mapCoverPeriodField(answers[COVER_PERIOD]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
        data: answers,
        href: generateChangeLink(
          UK_GOODS_OR_SERVICES_CHANGE,
          checkAndChangeLink,
          `#${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_END_BUYER),
        data: answers,
        href: generateChangeLink(END_BUYER_CHANGE, checkAndChangeLink, `#${HAS_END_BUYER}-label`, referenceNumber, isCheckAndChange, isInsuranceEligibility),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_END_BUYER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateEligibilityFields;
