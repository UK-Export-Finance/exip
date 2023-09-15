import { RequestBody } from '../../../../../../types';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapSubmittedData from '.';
import { mockBody } from './mocks';
import { mockApplication } from '../../../../../test-mocks';
import getSicCodeIDsFromApplication from '../../../../../helpers/get-sic-code-ids-from-application';

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER,
    COMPANY_HOUSE: {
      COMPANY_INCORPORATED,
      OLD_SIC_CODES,
      REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
    },
    YOUR_COMPANY: { ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/company-details/map-submitted-data', () => {
  describe(`when ${COMPANIES_HOUSE_NUMBER} success,and __typename fields are provided`, () => {
    it(`should return the formBody without ${COMPANIES_HOUSE_NUMBER} success,and __typename fields and change null fields in address to empty strings`, () => {
      const response = mapSubmittedData(mockBody, mockApplication);

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
        [OLD_SIC_CODES]: getSicCodeIDsFromApplication(mockApplication),
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${COMPANIES_HOUSE_NUMBER} success, and __typename fields are not provided`, () => {
    const mockBodyWithoutFields = {
      ...mockBody,
    } as RequestBody;

    delete mockBodyWithoutFields[COMPANIES_HOUSE_NUMBER];
    // eslint-disable-next-line no-underscore-dangle
    delete mockBodyWithoutFields.__typename;
    delete mockBodyWithoutFields.registeredOfficeAddress;
    delete mockBodyWithoutFields.dateOfCreation;
    delete mockBodyWithoutFields.success;
    delete mockBodyWithoutFields.apiError;
    delete mockBodyWithoutFields.companyNumber;
    delete mockBodyWithoutFields.sicCodes;
    delete mockBodyWithoutFields.industrySectorNames;

    it(`should return the formBody without ${COMPANIES_HOUSE_NUMBER} success,and __typename fields and add an empty address object`, () => {
      const response = mapSubmittedData(mockBodyWithoutFields, mockApplication);

      const { _csrf, ...expectedBody } = mockBodyWithoutFields;
      expectedBody.address = {};

      expect(response).toEqual(expectedBody);
    });
  });
});
