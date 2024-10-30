import { ELIGIBILITY_FIELDS } from '../../../../content-strings/fields/insurance';
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
  IS_PARTY_TO_CONSORTIUM,
  IS_MEMBER_OF_A_GROUP,
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
    PARTY_TO_CONSORTIUM_CHANGE,
    MEMBER_OF_A_GROUP_CHANGE,
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
        field: getFieldById(ELIGIBILITY_FIELDS, VALID_EXPORTER_LOCATION),
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
        field: getFieldById(ELIGIBILITY_FIELDS, HAS_COMPANIES_HOUSE_NUMBER),
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
        field: getFieldById(ELIGIBILITY_FIELDS, COMPANY_NUMBER),
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
        field: getFieldById(ELIGIBILITY_FIELDS, COMPANY_NAME),
        data: answers,
        renderChangeLink: false,
      },
      company[COMPANY_NAME],
    ),
    fieldGroupItem(
      {
        field: getFieldById(ELIGIBILITY_FIELDS, BUYER_COUNTRY),
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
        field: getFieldById(ELIGIBILITY_FIELDS, TOTAL_CONTRACT_VALUE),
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
        field: getFieldById(ELIGIBILITY_FIELDS, COVER_PERIOD),
        data: answers,
        href: generateChangeLink(COVER_PERIOD_CHANGE, checkAndChangeLink, `#${COVER_PERIOD}-label`, referenceNumber, isCheckAndChange, isInsuranceEligibility),
        renderChangeLink: true,
      },
      mapCoverPeriodField(answers[COVER_PERIOD]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(ELIGIBILITY_FIELDS, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
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
      ELIGIBILITY_FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    ),
    fieldGroupItem(
      {
        field: getFieldById(ELIGIBILITY_FIELDS, HAS_END_BUYER),
        data: answers,
        href: generateChangeLink(END_BUYER_CHANGE, checkAndChangeLink, `#${HAS_END_BUYER}-label`, referenceNumber, isCheckAndChange, isInsuranceEligibility),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_END_BUYER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(ELIGIBILITY_FIELDS, IS_PARTY_TO_CONSORTIUM),
        data: answers,
        href: generateChangeLink(
          PARTY_TO_CONSORTIUM_CHANGE,
          checkAndChangeLink,
          `#${IS_PARTY_TO_CONSORTIUM}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[IS_PARTY_TO_CONSORTIUM]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(ELIGIBILITY_FIELDS, IS_MEMBER_OF_A_GROUP),
        data: answers,
        href: generateChangeLink(
          MEMBER_OF_A_GROUP_CHANGE,
          checkAndChangeLink,
          `#${IS_MEMBER_OF_A_GROUP}-label`,
          referenceNumber,
          isCheckAndChange,
          isInsuranceEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[IS_MEMBER_OF_A_GROUP]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateEligibilityFields;
