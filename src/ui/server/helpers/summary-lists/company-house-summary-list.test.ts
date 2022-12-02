import { format } from 'date-fns';
import { generateFieldGroups, getKeyText, generateSummaryListRows, companyHouseSummaryList, generateAddressHTML } from './company-house-summary-list';
import { SummaryListItemData } from '../../../types';
import { FIELD_IDS } from '../../constants';
import { FIELDS, PAGES } from '../../content-strings';
import { mockCompanyResponse } from '../../test-mocks';

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
      const result = generateFieldGroups(mockCompanyResponse);

      const expected = {
        COMPANY_DETAILS: [
          {
            id: COMPANY_NUMBER,
            ...FIELDS[COMPANY_NUMBER],
            value: {
              text: mockCompanyResponse[COMPANY_NUMBER],
            },
          },
          {
            id: COMPANY_NAME,
            ...FIELDS[COMPANY_NAME],
            value: {
              text: mockCompanyResponse[COMPANY_NAME],
            },
          },
          {
            id: COMPANY_ADDRESS,
            ...FIELDS[COMPANY_ADDRESS],
            value: {
              html: `${mockCompanyResponse[COMPANY_ADDRESS].addressLine1}<br>${mockCompanyResponse[COMPANY_ADDRESS].locality}<br>${mockCompanyResponse[COMPANY_ADDRESS].region}<br>${mockCompanyResponse[COMPANY_ADDRESS].postalCode}<br>`,
            },
          },
          {
            id: COMPANY_INCORPORATED,
            ...FIELDS[COMPANY_INCORPORATED],
            value: {
              text: format(new Date(mockCompanyResponse[COMPANY_INCORPORATED]), 'dd MMMM yyyy'),
            },
          },
          {
            id: COMPANY_SIC,
            ...FIELDS[COMPANY_SIC],
            value: {
              text: mockCompanyResponse[COMPANY_SIC],
            },
          },
        ],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getKeyText()', () => {
    describe('when a field has SUMMARY objct', () => {
      const fieldId = COMPANY_NAME;

      it('should return FIELD.SUMMARY.TITLE', () => {
        const result = getKeyText(fieldId);

        const expected = FIELDS[COMPANY_NAME].SUMMARY?.TITLE;
        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows()', () => {
    const expectedObjBase = (field: SummaryListItemData) => ({
      key: {
        text: getKeyText(field.id),
        classes: `${field.id}-key`,
      },
      value: {
        text: field.value.text,
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    });

    it('returns an array of objects mapped to submitted data', () => {
      const fieldGroups = generateFieldGroups(mockCompanyResponse);

      const result = generateSummaryListRows(fieldGroups.COMPANY_DETAILS);

      const expectedObj = (field: SummaryListItemData) => ({
        ...expectedObjBase(field),
        key: {
          text: getKeyText(field.id),
          classes: `${field.id}-key`,
        },
        value: {
          text: field.value.text,
          classes: `${field.id}-value`,
        },
      });

      expect(result).toBeInstanceOf(Array);

      const fieldWithNoChangeLink = fieldGroups.COMPANY_DETAILS[1];

      const expected = expectedObj(fieldWithNoChangeLink);
      expect(result[1]).toEqual(expected);
    });
  });

  describe('companyHouseSummaryList()', () => {
    it('should return a mapped summary list for companies house response', () => {
      const fieldGroups = generateFieldGroups(mockCompanyResponse);

      const result = companyHouseSummaryList(mockCompanyResponse);

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
