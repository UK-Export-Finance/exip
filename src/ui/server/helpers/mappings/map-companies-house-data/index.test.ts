import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapCompaniesHouseData from '.';
import { mockCompaniesHouseResponse } from '../../../test-mocks';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
  },
} = INSURANCE_FIELD_IDS;

describe('helpers/mappings/map-companies-house-data', () => {
  it(`should return the formBody without ${COMPANY_NUMBER} success, __typename fields and null address fields as empty strings`, () => {
    const result = mapCompaniesHouseData(mockCompaniesHouseResponse);

    const { __typename, isActive, registeredOfficeAddress, ...data } = mockCompaniesHouseResponse;

    const expected = {
      ...data,
      dateOfCreation: new Date(data[COMPANY_INCORPORATED]).toISOString(),
      [COMPANY_ADDRESS]: {
        [CARE_OF]: '',
        [PREMISES]: '',
        [ADDRESS_LINE_1]: registeredOfficeAddress[ADDRESS_LINE_1],
        [ADDRESS_LINE_2]: '',
        [LOCALITY]: registeredOfficeAddress[LOCALITY],
        [REGION]: registeredOfficeAddress[REGION],
        [POSTAL_CODE]: registeredOfficeAddress[POSTAL_CODE],
        [COUNTRY]: '',
      },
    };

    expect(result).toEqual(expected);
  });

  describe(`when a company does not have ${COMPANY_ADDRESS}`, () => {
    it(`should return an empty ${COMPANY_ADDRESS} object`, () => {
      const result = mapCompaniesHouseData({
        ...mockCompaniesHouseResponse,
        [COMPANY_ADDRESS]: null,
      });

      expect(result[COMPANY_ADDRESS]).toEqual({});
    });
  });
});
