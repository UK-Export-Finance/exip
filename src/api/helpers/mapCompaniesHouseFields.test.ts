import { mapCompaniesHouseFields, CompanyHouseResponse } from './mapCompaniesHouseFields';

describe('mapCompaniesHouseFields()', () => {
  const companyHouseResponseMock = {
    company_name: 'Test name',
    registered_office_address: {
      care_of: null,
      premises: null,
      address_line_1: '10',
      address_line_2: null,
      locality: 'Westminster',
      region: 'London',
      postal_code: 'SW1A 2AA',
      country: null,
    },
    company_number: '123',
    date_of_creation: '2022-05-10',
    sic_codes: ['1'],
    success: true,
    apiError: false,
  } as CompanyHouseResponse;

  describe('when some fields from the response are null', () => {
    it('should return a response with certain fields as null which are not present in response', () => {
      const result = mapCompaniesHouseFields(companyHouseResponseMock);

      const expected = {
        companyName: companyHouseResponseMock.company_name,
        registeredOfficeAddress: {
          careOf: null,
          premises: null,
          addressLine1: companyHouseResponseMock.registered_office_address.address_line_1,
          addressLine2: null,
          locality: companyHouseResponseMock.registered_office_address.locality,
          region: companyHouseResponseMock.registered_office_address.region,
          postalCode: companyHouseResponseMock.registered_office_address.postal_code,
          country: null,
        },
        companyNumber: companyHouseResponseMock.company_number,
        dateOfCreation: companyHouseResponseMock.date_of_creation,
        sicCodes: companyHouseResponseMock.sic_codes,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all fields are present in the response', () => {
    it('should return a response with all fields completed', () => {
      companyHouseResponseMock.registered_office_address.care_of = 'tester';
      companyHouseResponseMock.registered_office_address.premises = 'building';
      companyHouseResponseMock.registered_office_address.address_line_2 = 'Downing';
      companyHouseResponseMock.registered_office_address.country = 'United Kingdom';

      const result = mapCompaniesHouseFields(companyHouseResponseMock);

      const expected = {
        companyName: companyHouseResponseMock.company_name,
        registeredOfficeAddress: {
          careOf: 'tester',
          premises: 'building',
          addressLine1: companyHouseResponseMock.registered_office_address.address_line_1,
          addressLine2: 'Downing',
          locality: companyHouseResponseMock.registered_office_address.locality,
          region: companyHouseResponseMock.registered_office_address.region,
          postalCode: companyHouseResponseMock.registered_office_address.postal_code,
          country: 'United Kingdom',
        },
        companyNumber: companyHouseResponseMock.company_number,
        dateOfCreation: companyHouseResponseMock.date_of_creation,
        sicCodes: companyHouseResponseMock.sic_codes,
      };

      expect(result).toEqual(expected);
    });
  });
});
