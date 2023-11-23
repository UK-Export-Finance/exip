import formatDate from '../../date/format-date';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { FIELDS } from '../../../content-strings';
import generateSummaryListRows from '../generate-summary-list-rows';
import fieldGroupItem from '../generate-field-group-item';
import getFieldById from '../../get-field-by-id';
import generateMultipleFieldHtml from '../../generate-multiple-field-html';
import { ApplicationCompany, Company, SummaryListItemData } from '../../../../types';

import generateSicCodesValue from './generate-sic-codes-value';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

/**
 * Create all field groups for govukSummaryList
 * The following fields depend on the response from companies house api:
 * - COMPANY_ADDRESS - if all parts of address are returned or not
 * @param {Object} Company details
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
export const generateFields = (company: Company | ApplicationCompany, isApplicationData?: boolean) => {
  const data = company;

  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NUMBER),
      data,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NAME),
      data,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_ADDRESS),
        data,
      },
      generateMultipleFieldHtml(company[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_INCORPORATED),
        data,
      },
      formatDate(company[COMPANY_INCORPORATED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_SIC),
        data,
      },
      generateSicCodesValue(company, isApplicationData),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

/**
 * companiesHouseSummaryList
 * Create a group with govukSummaryList data structure
 * @param {Object} All quote content in a simple object.text structure
 * @returns {Object} A group with multiple fields/answers in govukSummaryList data structure
 */
export const companiesHouseSummaryList = (company?: Company | ApplicationCompany, isApplicationData?: boolean) => {
  if (company) {
    const fields = generateFields(company, isApplicationData);

    const summaryList = {
      COMPANY_DETAILS: {
        ROWS: generateSummaryListRows(fields),
      },
    };

    return summaryList;
  }

  return {};
};
