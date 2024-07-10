import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import generateChangeLink from '../../../generate-change-link';
import generateAddressObject from '../../generate-address-object';
import { ApplicationBuyer, SummaryListGroupData, SummaryListItemData, InsuranceEligibility } from '../../../../../types';

const {
  YOUR_BUYER: FIELD_IDS,
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_DETAILS: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, COUNTRY, ADDRESS, REGISTRATION_NUMBER, WEBSITE },
} = FIELD_IDS;

/**
 * generateCompanyOrOrganisationFields
 * Create all company or organisation fields and values for the Insurance - Your buyer govukSummaryList
 * @param {ApplicationBuyer} answers: buyer data
 * @param {InsuranceEligibility} answersEligibility: Eligibility data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {SummaryListGroupData} All company fields and values in an SummaryListGroupData structure for GOVUK summary list structure
 */
const generateCompanyOrOrganisationFields = (
  answers: ApplicationBuyer,
  answersEligibility: InsuranceEligibility,
  referenceNumber: number,
  checkAndChange?: boolean,
): SummaryListGroupData => {
  const addressObject = generateAddressObject(answers[ADDRESS]);

  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, NAME),
      data: answers,
      href: generateChangeLink(COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, ADDRESS),
        data: answers,
        href: generateChangeLink(
          COMPANY_OR_ORGANISATION_CHANGE,
          COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
          `#${ADDRESS}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      generateMultipleFieldHtml(addressObject),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, COUNTRY),
        data: answers,
        renderChangeLink: false,
      },
      answersEligibility[BUYER_COUNTRY].name,
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, REGISTRATION_NUMBER),
      data: answers,
      href: generateChangeLink(
        COMPANY_OR_ORGANISATION_CHANGE,
        COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
        `#${REGISTRATION_NUMBER}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, WEBSITE),
      data: answers,
      href: generateChangeLink(COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE, `#${WEBSITE}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generateCompanyOrOrganisationFields;
