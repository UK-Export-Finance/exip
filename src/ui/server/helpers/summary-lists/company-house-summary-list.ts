import formatDate from '../date/format-date';
import { FIELD_IDS } from '../../constants';
import { DEFAULT, FIELDS, PAGES } from '../../content-strings';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import { ApplicationCompany, CompanyHouseResponse, SummaryListItemData } from '../../../types';
import generateMultipleFieldHtml from '../generate-multiple-field-html';
import { stringArrayHasValue, isPopulatedArray } from '../array';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, INDUSTRY_SECTOR_NAMES } = COMPANY_HOUSE;

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
const generateFields = (companyDetails: CompanyHouseResponse | ApplicationCompany) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NUMBER),
      data: companyDetails,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS, COMPANY_NAME),
      data: companyDetails,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_ADDRESS),
        data: companyDetails,
      },
      generateMultipleFieldHtml(companyDetails[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_INCORPORATED),
        data: companyDetails,
      },
      formatDate(companyDetails[COMPANY_INCORPORATED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, COMPANY_SIC),
        data: companyDetails,
      },
      generateSicCodesValue(companyDetails[COMPANY_SIC], companyDetails[INDUSTRY_SECTOR_NAMES]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

/**
 * companyHouseSummaryList
 * Create a group with govukSummaryList data structure
 * @param {Object} All quote content in a simple object.text structure
 * @returns {Object} A group with multiple fields/answers in govukSummaryList data structure
 */
const companyHouseSummaryList = (companyDetails: CompanyHouseResponse | ApplicationCompany) => {
  const fields = generateFields(companyDetails);

  const summaryList = {
    COMPANY_DETAILS: {
      GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
      ROWS: generateSummaryListRows(fields),
    },
  };

  return summaryList;
};

export { generateSicCodesValue, generateFields, companyHouseSummaryList };
