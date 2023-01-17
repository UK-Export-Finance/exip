import { format } from 'date-fns';
import { FIELD_IDS } from '../../constants';
import { FIELDS, PAGES } from '../../content-strings';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import { CompanyHouseResponse, CompanyDetailsFieldGroups } from '../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC } = COMPANY_HOUSE;

/**
 * able to handle addresses with all fields present or where some are null as not present
 * maps through addrress object and contructs an html string containing line breaks
 * skips fields where the field is null or is typename
 * @param {Object} Address
 * @returns {String} Address as a string of HTMl
 */
const generateAddressHTML = (address: object) => {
  let addressString = '';

  Object.keys(address).forEach((field) => {
    // if the address field exists and not the typename part
    if (address[field] && field !== '__typename' && field !== 'id') {
      addressString += `${address[field]}<br>`;
    }
  });

  return addressString;
};

/**
 * Create all field groups for govukSummaryList
 * The following fields depend on the response from companies house api:
 * - COMPANY_ADDRESS - if all parts of address are returned or not
 * @param {Object} Company details
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
const generateFieldGroups = (companyDetails: CompanyHouseResponse) => {
  const fieldGroups = {
    COMPANY_DETAILS: [],
  } as CompanyDetailsFieldGroups;

  fieldGroups.COMPANY_DETAILS = [
    fieldGroupItem({
      field: { id: COMPANY_NUMBER, ...FIELDS[COMPANY_NUMBER] },
      data: companyDetails,
    }),
    fieldGroupItem({
      field: { id: COMPANY_NAME, ...FIELDS[COMPANY_NAME] },
      data: companyDetails,
    }),
    fieldGroupItem(
      {
        field: { id: COMPANY_ADDRESS, ...FIELDS[COMPANY_ADDRESS] },
        data: companyDetails,
      },
      generateAddressHTML(companyDetails[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: { id: COMPANY_INCORPORATED, ...FIELDS[COMPANY_INCORPORATED] },
        data: companyDetails,
      },
      format(new Date(companyDetails[COMPANY_INCORPORATED]), 'd MMMM yyyy'),
    ),
    fieldGroupItem(
      {
        field: { id: COMPANY_SIC, ...FIELDS[COMPANY_SIC] },
        data: companyDetails,
      },
      companyDetails[COMPANY_SIC][0],
    ),
  ];

  return fieldGroups;
};

/**
 * companyHouseSummaryList
 * Create a group with govukSummaryList data structure
 * @param {Object} All quote content in a simple object.text structure
 * @returns {Object} A group with multiple fields/answers in govukSummaryList data structure
 */
const companyHouseSummaryList = (companyDetails: CompanyHouseResponse) => {
  const fieldGroups = generateFieldGroups(companyDetails);

  const summaryList = {
    COMPANY_DETAILS: {
      GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
      ROWS: generateSummaryListRows(fieldGroups.COMPANY_DETAILS),
    },
  };

  return summaryList;
};

export { generateFieldGroups, companyHouseSummaryList, generateAddressHTML };
