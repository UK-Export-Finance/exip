import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapCompaniesHouseData from '.';
import { mockCompany } from '../../../test-mocks';
import { RequestBody } from '../../../../types';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
  },
} = INSURANCE_FIELD_IDS;

describe('helpers/mappings/map-companies-house-data', () => {
  describe(`when ${COMPANY_NUMBER} success fields are provided`, () => {
    it(`should return the formBody without ${COMPANY_NUMBER} success,and __typename fields and change null fields in address to empty strings`, () => {
      const result = mapCompaniesHouseData(mockCompany);

      const expected = {
        ...mockCompany,
        dateOfCreation: new Date(mockCompany[COMPANY_INCORPORATED]).toISOString(),
        [COMPANY_ADDRESS]: {
          [CARE_OF]: '',
          [PREMISES]: '',
          [ADDRESS_LINE_1]: mockCompany.registeredOfficeAddress[ADDRESS_LINE_1],
          [ADDRESS_LINE_2]: '',
          [LOCALITY]: mockCompany.registeredOfficeAddress[LOCALITY],
          [REGION]: mockCompany.registeredOfficeAddress[REGION],
          [POSTAL_CODE]: mockCompany.registeredOfficeAddress[POSTAL_CODE],
          [COUNTRY]: '',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${COMPANY_NUMBER} is NOT provided`, () => {
    const mockBodyWithoutFields = {} as RequestBody;

    it(`should return the formBody without ${COMPANY_NUMBER} and an empty address object`, () => {
      const result = mapCompaniesHouseData(mockBodyWithoutFields);

      const expected = {
        ...mockBodyWithoutFields,
        [COMPANY_ADDRESS]: {},
      };

      expect(result).toEqual(expected);
    });
  });
});
