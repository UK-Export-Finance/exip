import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationCompany, SummaryListItemData, SummaryListGroupData } from '../../../../../types';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import generateAddressObject from '../../generate-address-object';
import mapYesAlternateField from '../../../mappings/map-yes-alternate-field';

const {
  YOUR_BUSINESS: { COMPANY_DETAILS: FORM_TITLE },
} = FORM_TITLES;

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
    YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

/**
 * generateYourCompanyFields
 * Create all Your company fields and values for the Insurance - Company details govukSummaryList
 * @param {ApplicationCompany} answers: Company answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} All company fields and values in an object structure for GOVUK summary list structure
 */
const generateYourCompanyFields = (answers: ApplicationCompany, referenceNumber: number, checkAndChange: boolean): SummaryListGroupData => {
  // generates address object for TRADING_ADDRESS row
  const addressObject = generateAddressObject(answers[DIFFERENT_TRADING_ADDRESS]?.[FULL_ADDRESS]);
  const address = generateMultipleFieldHtml(addressObject);

  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, HAS_DIFFERENT_TRADING_NAME),
        data: answers,
        href: generateChangeLink(
          COMPANY_DETAILS_CHANGE,
          COMPANY_DETAILS_CHECK_AND_CHANGE,
          `#${HAS_DIFFERENT_TRADING_NAME}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesAlternateField(answers[HAS_DIFFERENT_TRADING_NAME], answers[DIFFERENT_TRADING_NAME]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
        data: answers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_ADDRESS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesAlternateField(answers[TRADING_ADDRESS], address),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, WEBSITE),
      data: answers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${WEBSITE}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, PHONE_NUMBER),
      data: answers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${PHONE_NUMBER}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generateYourCompanyFields;
