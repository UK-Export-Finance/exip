import { format } from 'date-fns';
import { generateFieldGroups, companyHouseSummaryList, generateAddressHTML } from './company-house-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import { FIELD_IDS } from '../../constants';
import { FIELDS, PAGES } from '../../content-strings';
import { mockCompany } from '../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC } = COMPANY_HOUSE;

describe('server/helpers/summary-lists/company-house-summary-list', () => {
  describe('generateAddressHTML()', () => {
    it('should generate address where all fields are present', () => {
      const address = {
        careOf: 'Careof',
        premises: 'Premise',
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        locality: 'Locality',
        region: 'Region',
        postalCode: 'Postcode',
        country: 'Country',
        __typename: 'CompanyAddress',
      };

      const result = generateAddressHTML(address);

      const expected = `${address.careOf}<br>${address.premises}<br>${address.addressLine1}<br>${address.addressLine2}<br>${address.locality}<br>${address.region}<br>${address.postalCode}<br>${address.country}<br>`;
      expect(result).toEqual(expected);
    });

    it('should only generate address where all fields are not null', () => {
      const address = {
        careOf: null,
        premises: 'Premise',
        addressLine1: 'Line 1',
        addressLine2: null,
        locality: 'Locality',
        region: 'Region',
        postalCode: 'Postcode',
        country: null,
        __typename: 'CompanyAddress',
      };

      const result = generateAddressHTML(address);

      const expected = `${address.premises}<br>${address.addressLine1}<br>${address.locality}<br>${address.region}<br>${address.postalCode}<br>`;
      expect(result).toEqual(expected);
    });
  });

  describe('generateFieldGroups()', () => {
    it('should populate field groups when provided with companyDetails', () => {
      const result = generateFieldGroups(mockCompany);

      const expected = {
        COMPANY_DETAILS: [
          {
            id: COMPANY_NUMBER,
            ...FIELDS[COMPANY_NUMBER],
            value: {
              text: mockCompany[COMPANY_NUMBER],
            },
          },
          {
            id: COMPANY_NAME,
            ...FIELDS[COMPANY_NAME],
            value: {
              text: mockCompany[COMPANY_NAME],
            },
          },
          {
            id: COMPANY_ADDRESS,
            ...FIELDS[COMPANY_ADDRESS],
            value: {
              html: `${mockCompany[COMPANY_ADDRESS].addressLine1}<br>${mockCompany[COMPANY_ADDRESS].locality}<br>${mockCompany[COMPANY_ADDRESS].region}<br>${mockCompany[COMPANY_ADDRESS].postalCode}<br>`,
            },
          },
          {
            id: COMPANY_INCORPORATED,
            ...FIELDS[COMPANY_INCORPORATED],
            value: {
              text: format(new Date(mockCompany[COMPANY_INCORPORATED]), 'dd MMMM yyyy'),
            },
          },
          {
            id: COMPANY_SIC,
            ...FIELDS[COMPANY_SIC],
            value: {
              text: mockCompany[COMPANY_SIC],
            },
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('companyHouseSummaryList()', () => {
    it('should return a mapped summary list for companies house response', () => {
      const fieldGroups = generateFieldGroups(mockCompany);

      const result = companyHouseSummaryList(mockCompany);

      const expected = {
        COMPANY_DETAILS: {
          GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
          ROWS: generateSummaryListRows(fieldGroups.COMPANY_DETAILS),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
