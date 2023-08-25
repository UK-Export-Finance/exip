import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '.';
import { mockBody } from './mocks';
import { mockApplication } from '../../../../../test-mocks';
import getSicCodeIDsFromApplication from '../../../../../helpers/get-sic-code-ids-from-application';

const {
  COMPANIES_HOUSE_NUMBER,
  COMPANY_HOUSE: { COMPANY_INCORPORATED },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/company-details/map-submitted-data', () => {
  describe(`when ${COMPANIES_HOUSE_NUMBER} success,and __typename fields are provided`, () => {
    it(`should return the formBody without ${COMPANIES_HOUSE_NUMBER} success,and __typename fields and change null fields in address to empty strings`, () => {
      const response = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        companyName: mockBody.companyName,
        companyNumber: mockBody.companyNumber.toString(),
        dateOfCreation: new Date(mockBody[COMPANY_INCORPORATED]).toISOString(),
        address: {
          careOf: '',
          premises: '',
          addressLine1: mockBody.registeredOfficeAddress.addressLine1,
          addressLine2: '',
          locality: mockBody.registeredOfficeAddress.locality,
          region: mockBody.registeredOfficeAddress.region,
          postalCode: mockBody.registeredOfficeAddress.postalCode,
          country: '',
        },
        sicCodes: mockBody.sicCodes,
        industrySectorNames: mockBody.industrySectorNames,
        oldSicCodes: getSicCodeIDsFromApplication(mockApplication),
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
