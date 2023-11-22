import formatDate from '../../date/format-date';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT, FIELDS } from '../../../content-strings';
import generateSummaryListRows from '../generate-summary-list-rows';
import fieldGroupItem from '../generate-field-group-item';
import getFieldById from '../../get-field-by-id';
import generateMultipleFieldHtml from '../../generate-multiple-field-html';
import { stringArrayHasValue, isPopulatedArray } from '../../array';
import { ApplicationCompany, Company, SummaryListItemData } from '../../../../types';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, INDUSTRY_SECTOR_NAMES },
} = INSURANCE_FIELD_IDS;

/**
 * generateSicCodesValue
 * generates string with sicCode and description with line breaks
 * maps through sicCodes, and if there is a description at that index, string will contain description
 * @param {Array<string>} sicCodes
 * @param {Array<string>} industrySectorNames
 * @returns {String} Sic codes as a single string or default empty string
 */
const generateSicCodesValue = (sicCodes?: Array<string>, industrySectorNames?: Array<string>): string => {
  if (sicCodes && isPopulatedArray(sicCodes)) {
    const string = [] as Array<string>;

    sicCodes.forEach((sicCode, index) => {
      if (industrySectorNames && stringArrayHasValue(index, industrySectorNames)) {
        string.push(`${sicCode} - ${industrySectorNames[index]} </br>`);
      } else {
        string.push(`${sicCode} </br>`);
      }
    });

    return string.join('');
  }

  return DEFAULT.EMPTY;
};
/**
 * Create all field groups for govukSummaryList
 * The following fields depend on the response from companies house api:
 * - COMPANY_ADDRESS - if all parts of address are returned or not
 * @param {Object} Company details
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
const generateFields = (company: Company | ApplicationCompany) => {
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
      generateSicCodesValue(company[COMPANY_SIC], company[INDUSTRY_SECTOR_NAMES]),
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
const companiesHouseSummaryList = (company?: Company | ApplicationCompany) => {
  if (company) {
    const fields = generateFields(company);

    const summaryList = {
      COMPANY_DETAILS: {
        ROWS: generateSummaryListRows(fields),
      },
    };

    return summaryList;
  }

  return {};
};

export { generateSicCodesValue, generateFields, companiesHouseSummaryList };
