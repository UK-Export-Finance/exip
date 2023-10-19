import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapCompaniesHouseData from '.';
import mockBody from './mocks';
import { RequestBody } from '../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
    COMPANY_HOUSE: {
      COMPANY_INCORPORATED,
      REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
    },
    YOUR_COMPANY: { ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

describe('helpers/mappings/map-companies-house-data', () => {
  describe(`when ${COMPANIES_HOUSE_NUMBER} success fields are provided`, () => {
    it(`should return the formBody without ${COMPANIES_HOUSE_NUMBER} success,and __typename fields and change null fields in address to empty strings`, () => {
      const response = mapCompaniesHouseData(mockBody);

      const expected = {
        companyName: mockBody.companyName,
        companyNumber: mockBody.companyNumber.toString(),
        dateOfCreation: new Date(mockBody[COMPANY_INCORPORATED]).toISOString(),
        [ADDRESS]: {
          [CARE_OF]: '',
          [PREMISES]: '',
          [ADDRESS_LINE_1]: mockBody.registeredOfficeAddress[ADDRESS_LINE_1],
          [ADDRESS_LINE_2]: '',
          [LOCALITY]: mockBody.registeredOfficeAddress[LOCALITY],
          [REGION]: mockBody.registeredOfficeAddress[REGION],
          [POSTAL_CODE]: mockBody.registeredOfficeAddress[POSTAL_CODE],
          [COUNTRY]: '',
        },
        sicCodes: mockBody.sicCodes,
        industrySectorNames: mockBody.industrySectorNames,
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${COMPANIES_HOUSE_NUMBER} is NOT provided`, () => {
    const mockBodyWithoutFields = {} as RequestBody;

    beforeEach(() => {
      delete mockBodyWithoutFields[COMPANIES_HOUSE_NUMBER];
      delete mockBodyWithoutFields.registeredOfficeAddress;
      delete mockBodyWithoutFields.dateOfCreation;
      delete mockBodyWithoutFields.companyNumber;
      delete mockBodyWithoutFields.sicCodes;
      delete mockBodyWithoutFields.industrySectorNames;
    });

    it(`should return the formBody without ${COMPANIES_HOUSE_NUMBER} and an empty address object`, () => {
      const response = mapCompaniesHouseData(mockBodyWithoutFields);

      const { _csrf, ...expectedBody } = mockBodyWithoutFields;
      expectedBody.address = {};

      expect(response).toEqual(expectedBody);
    });
  });
});
