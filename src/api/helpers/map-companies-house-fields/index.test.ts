import mockIndustrySectors from '../../test-mocks/mock-industry-sectors';
import { mapCompaniesHouseFields } from '.';
import createFullTimestampFromDayAndMonth from '../create-full-timestamp-from-day-month';
import mapSicCodeDescriptions from '../map-sic-code-descriptions';
import { CompaniesHouseResponse } from '../../types';

describe('mapCompaniesHouseFields()', () => {
  const companiesHouseResponseMock = {
    company_name: 'Test name',
    registered_office_address: {
      care_of: undefined,
      premises: undefined,
      address_line_1: '10',
      address_line_2: undefined,
      locality: 'Westminster',
      region: 'London',
      postal_code: 'SW1A 2HQ',
      country: undefined,
    },
    company_number: '123',
    date_of_creation: '2022-05-10',
    sic_codes: ['1'],
    success: true,
    apiError: false,
    accounts: {
      accounting_reference_date: {
        day: '1',
        month: '12',
      },
    },
  } as CompaniesHouseResponse;

  describe('when some fields from the response are undefined', () => {
    it('should return a response with certain fields as undefined which are not present in response', () => {
      const result = mapCompaniesHouseFields(companiesHouseResponseMock, mockIndustrySectors);

      const expected = {
        companyName: companiesHouseResponseMock.company_name,
        registeredOfficeAddress: {
          careOf: undefined,
          premises: undefined,
          addressLine1: companiesHouseResponseMock.registered_office_address.address_line_1,
          addressLine2: undefined,
          locality: companiesHouseResponseMock.registered_office_address.locality,
          region: companiesHouseResponseMock.registered_office_address.region,
          postalCode: companiesHouseResponseMock.registered_office_address.postal_code,
          country: undefined,
        },
        companyNumber: companiesHouseResponseMock.company_number,
        dateOfCreation: companiesHouseResponseMock.date_of_creation,
        sicCodes: companiesHouseResponseMock.sic_codes,
        industrySectorNames: mapSicCodeDescriptions(companiesHouseResponseMock.sic_codes, mockIndustrySectors),
        financialYearEndDate: createFullTimestampFromDayAndMonth(
          companiesHouseResponseMock.accounts.accounting_reference_date.day,
          companiesHouseResponseMock.accounts.accounting_reference_date.month,
        ),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all fields are present in the response', () => {
    it('should return a response with all fields completed', () => {
      companiesHouseResponseMock.registered_office_address.care_of = 'tester';
      companiesHouseResponseMock.registered_office_address.premises = 'building';
      companiesHouseResponseMock.registered_office_address.address_line_2 = 'Downing';
      companiesHouseResponseMock.registered_office_address.country = 'United Kingdom';

      const result = mapCompaniesHouseFields(companiesHouseResponseMock, mockIndustrySectors);

      const expected = {
        companyName: companiesHouseResponseMock.company_name,
        registeredOfficeAddress: {
          careOf: 'tester',
          premises: 'building',
          addressLine1: companiesHouseResponseMock.registered_office_address.address_line_1,
          addressLine2: 'Downing',
          locality: companiesHouseResponseMock.registered_office_address.locality,
          region: companiesHouseResponseMock.registered_office_address.region,
          postalCode: companiesHouseResponseMock.registered_office_address.postal_code,
          country: 'United Kingdom',
        },
        companyNumber: companiesHouseResponseMock.company_number,
        dateOfCreation: companiesHouseResponseMock.date_of_creation,
        sicCodes: companiesHouseResponseMock.sic_codes,
        industrySectorNames: mapSicCodeDescriptions(companiesHouseResponseMock.sic_codes, mockIndustrySectors),
        financialYearEndDate: createFullTimestampFromDayAndMonth(
          companiesHouseResponseMock.accounts.accounting_reference_date.day,
          companiesHouseResponseMock.accounts.accounting_reference_date.month,
        ),
      };

      expect(result).toEqual(expected);
    });
  });
});
