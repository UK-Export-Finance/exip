import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { ApplicationBuyer, SummaryListItemData } from '../../../../../types';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
} = FIELD_IDS;

/**
 * generateAddressObject
 * generates object with address and country to generate html string for address section
 * @param {ApplicationBuyer} answers
 * @returns {Object}
 */
export const generateAddressObject = (answers: ApplicationBuyer) => {
  return {
    address: answers[ADDRESS],
    country: answers[COUNTRY]?.name,
  };
};

/**
 * generateContactDetailObject
 * generates object with fullname, position and email to generate html string for address section
 * @param {ApplicationBuyer} answers
 * @returns {Object}
 */
export const generateContactDetailObject = (answers: ApplicationBuyer) => {
  const fullName = `${answers[FIRST_NAME]} ${answers[LAST_NAME]}`;

  return {
    name: fullName,
    position: answers[POSITION],
    email: answers[EMAIL],
  };
};

/**
 * generateCompanyOrOrganisationFields
 * Create all company or organisation fields and values for the Insurance - Your buyer govukSummaryList
 * @param {ApplicationBuyer} answers buyer data
 * @param {Number} referenceNumber application reference number
 * @returns {Object} All exporter company fields and values in an object structure for GOVUK summary list structure
 */
const generateCompanyOrOrganisationFields = (answers: ApplicationBuyer, referenceNumber: number) => {
  const addressObject = generateAddressObject(answers);
  const contactDetailsObject = generateContactDetailObject(answers);

  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, NAME),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${NAME}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, ADDRESS),
        data: answers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${ADDRESS}-label`,
        renderChangeLink: true,
      },
      generateMultipleFieldHtml(addressObject),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, REGISTRATION_NUMBER),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${REGISTRATION_NUMBER}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, WEBSITE),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${WEBSITE}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, FIRST_NAME),
        data: answers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${FIRST_NAME}-label`,
        renderChangeLink: true,
      },
      generateMultipleFieldHtml(contactDetailsObject),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, CAN_CONTACT_BUYER),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_CHANGE}#${CAN_CONTACT_BUYER}-label`,
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateCompanyOrOrganisationFields;
