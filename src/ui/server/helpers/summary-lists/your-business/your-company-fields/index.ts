import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import mapSicCodes from '../map-sic-codes';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationCompany, SummaryListItemData } from '../../../../../types';
import { DEFAULT } from '../../../../content-strings';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER_CHANGE, COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE, COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, WEBSITE, PHONE_NUMBER },
} = FIELD_IDS;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

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
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NUMBER),
      data: answers,
      href: generateChangeLink(COMPANIES_HOUSE_NUMBER_CHANGE, COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE, '#heading', referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NAME),
      data: answers,
      renderChangeLink: false,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_ADDRESS),
        data: answers,
        renderChangeLink: false,
      },
      generateMultipleFieldHtml(answers[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_INCORPORATED),
        data: answers,
        renderChangeLink: false,
      },
      formatDate(answers[COMPANY_INCORPORATED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_SIC),
        data: answers,
        renderChangeLink: false,
      },
      mapSicCodes(answers[COMPANY_SIC]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, FINANCIAL_YEAR_END_DATE),
        data: answers,
        renderChangeLink: false,
      },
      // if no financial year end date, then should be default.empty
      answers[FINANCIAL_YEAR_END_DATE] ? formatDate(answers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT) : DEFAULT.EMPTY,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_NAME),
        data: answers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[TRADING_NAME]),
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
