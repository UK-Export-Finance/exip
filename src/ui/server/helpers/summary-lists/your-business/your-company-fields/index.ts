import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationCompany, SummaryListItemData } from '../../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

/**
 * generateYourCompanyFields
 * Create all your company fields and values for the Insurance - Company details govukSummaryList
 * @param {ApplicationCompany} answers company data
 * @param {Number} referenceNumber application reference number
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All company fields and values in an object structure for GOVUK summary list structure
 */
const generateYourCompanyFields = (answers: ApplicationCompany, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, HAS_DIFFERENT_TRADING_NAME),
        data: answers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${HAS_DIFFERENT_TRADING_NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_DIFFERENT_TRADING_NAME]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
        data: answers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_ADDRESS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[TRADING_ADDRESS]),
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

  return fields;
};

export default generateYourCompanyFields;
