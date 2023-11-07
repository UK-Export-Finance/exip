import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { ApplicationBuyer, SummaryListItemData } from '../../../../../types';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { COMPANY_OR_ORGANISATION_CHANGE, COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
} = FIELD_IDS;

/**
 * generateAddressObject
 * generates object with address and country to generate html string for address section
 * @param {ApplicationBuyer} answers
 * @returns {Object}
 */
export const generateAddressObject = (answers: ApplicationBuyer) => {
  // replace new lines with line breaks to display in summary list
  const address = replaceNewLineWithLineBreak(answers[ADDRESS]);

  return {
    address,
  };
};

/**
 * generateContactDetailsObject
 * generates object with fullname, position and email to generate html string for address section
 * @param {ApplicationBuyer} answers
 * @returns {Object}
 */
export const generateContactDetailsObject = (answers: ApplicationBuyer) => {
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
 * @returns {Object} All company fields and values in an object structure for GOVUK summary list structure
 */
const generateCompanyOrOrganisationFields = (answers: ApplicationBuyer, referenceNumber: number, checkAndChange: boolean) => {
  const addressObject = generateAddressObject(answers);
  const contactDetailsObject = generateContactDetailsObject(answers);

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
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, FIRST_NAME),
        data: answers,
        href: generateChangeLink(
          COMPANY_OR_ORGANISATION_CHANGE,
          COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
          `#${FIRST_NAME}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      generateMultipleFieldHtml(contactDetailsObject),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_OR_ORGANISATION, CAN_CONTACT_BUYER),
        data: answers,
        href: generateChangeLink(
          COMPANY_OR_ORGANISATION_CHANGE,
          COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
          `#${CAN_CONTACT_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[CAN_CONTACT_BUYER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateCompanyOrOrganisationFields;
