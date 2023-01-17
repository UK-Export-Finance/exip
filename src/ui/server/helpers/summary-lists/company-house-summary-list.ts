import { format } from 'date-fns';
import getKeyText from './get-key-text';
import { FIELD_IDS } from '../../constants';
import { FIELDS, PAGES } from '../../content-strings';
import { CompanyHouseResponse, CompanyDetailsFieldGroups, SummaryListItem, SummaryListItemData } from '../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC } = COMPANY_HOUSE;

/**
 * able to handle addresses with all fields present or where some are null as not present
 * maps through addrress object and contructs an html string containing line breaks
 * skips fields where the field is null or is typename
 * @param address
 * @returns string containing html of address
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
 * @param companyDetails object
 * @returns object with fieldGroups populated
 */
const generateFieldGroups = (companyDetails: CompanyHouseResponse) => {
  const fieldGroups = {
    COMPANY_DETAILS: [],
  } as CompanyDetailsFieldGroups;

  fieldGroups.COMPANY_DETAILS = [
    {
      id: COMPANY_NUMBER,
      ...FIELDS[COMPANY_NUMBER],
      value: {
        text: companyDetails[COMPANY_NUMBER],
      },
    },
    {
      id: COMPANY_NAME,
      ...FIELDS[COMPANY_NAME],
      value: {
        text: companyDetails[COMPANY_NAME],
      },
    },
    {
      id: COMPANY_ADDRESS,
      ...FIELDS[COMPANY_ADDRESS],
      value: {
        html: generateAddressHTML(companyDetails[COMPANY_ADDRESS]),
      },
    },
    {
      id: COMPANY_INCORPORATED,
      ...FIELDS[COMPANY_INCORPORATED],
      value: {
        text: format(new Date(companyDetails[COMPANY_INCORPORATED]), 'd MMMM yyyy'),
      },
    },
    {
      id: COMPANY_SIC,
      ...FIELDS[COMPANY_SIC],
      value: {
        text: companyDetails[COMPANY_SIC],
      },
    },
  ];

  return fieldGroups;
};

/**
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 * @param fields - Array of SummaryListItemData
 * @returns mapped object with summary list rows populated
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>): Array<SummaryListItem> =>
  fields.map((field: SummaryListItemData): SummaryListItem => {
    const mapped = {
      key: {
        text: getKeyText(FIELDS, field.id),
        classes: `${field.id}-key`,
      },
      value: {
        text: field.value.text,
        html: field.value.html,
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    } as SummaryListItem;

    return mapped;
  });

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

export { generateFieldGroups, generateSummaryListRows, companyHouseSummaryList, generateAddressHTML };
