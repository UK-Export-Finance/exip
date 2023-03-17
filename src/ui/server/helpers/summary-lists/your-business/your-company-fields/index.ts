import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import { ApplicationExporterCompany, SummaryListItemData } from '../../../../../types';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapSicCodes from '../map-sic-codes';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_HOUSE: { INPUT, COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS, FINANCIAL_YEAR_END_DATE },
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
 * @param {ApplicationExporterCompany} answers exporter company data
 * @param {Number} referenceNumber application reference number
 * @returns {Object} All exporter company fields and values in an object structure for GOVUK summary list structure
 */
const generateYourCompanyFields = (answers: ApplicationExporterCompany, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NUMBER),
      data: answers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${INPUT}-label`, referenceNumber, checkAndChange),
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
      formatDate(answers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_NAME),
      data: answers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_NAME}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
      data: answers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_ADDRESS}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
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
