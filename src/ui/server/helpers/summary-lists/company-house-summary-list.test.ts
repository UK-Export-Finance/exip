import formatDate from '../date/format-date';
import { generateAddressHTML, generateSicCodesValue, generateFields, companyHouseSummaryList } from './company-house-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import { FIELD_IDS } from '../../constants';
import { DEFAULT, FIELDS, PAGES } from '../../content-strings';
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

    it('should remove id field when it is present', () => {
      const address = {
        id: '12345',
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

    describe('when there is no data', () => {
      it('should return default empty string', () => {
        const result = generateAddressHTML({});

        const expected = DEFAULT.EMPTY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateSicCodesValue', () => {
    it('should return sic codes as a single string', () => {
      const mockSicCodes = mockCompany.sicCodes;
      const result = generateSicCodesValue(mockSicCodes);

      const expected = mockSicCodes.toString();
      expect(result).toEqual(expected);
    });

    describe('when sic codes is an empty array', () => {
      it('should return default empty string', () => {
        const result = generateSicCodesValue([]);

        const expected = DEFAULT.EMPTY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateFields', () => {
    it('should populate field groups when provided with companyDetails', () => {
      const result = generateFields(mockCompany);

      const expected = [
        fieldGroupItem({
          field: getFieldById(FIELDS, COMPANY_NUMBER),
          data: mockCompany,
        }),
        fieldGroupItem({
          field: getFieldById(FIELDS, COMPANY_NAME),
          data: mockCompany,
        }),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_ADDRESS),
            data: mockCompany,
          },
          generateAddressHTML(mockCompany[COMPANY_ADDRESS]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_INCORPORATED),
            data: mockCompany,
          },
          formatDate(mockCompany[COMPANY_INCORPORATED]),
        ),
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, COMPANY_SIC),
            data: mockCompany,
          },
          mockCompany[COMPANY_SIC].toString(),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('companyHouseSummaryList()', () => {
    it('should return a mapped summary list for companies house response', () => {
      const fields = generateFields(mockCompany);

      const result = companyHouseSummaryList(mockCompany);

      const expected = {
        COMPANY_DETAILS: {
          GROUP_TITLE: PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS.TABLE_NAME,
          ROWS: generateSummaryListRows(fields),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
