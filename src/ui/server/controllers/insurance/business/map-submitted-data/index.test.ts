import { RequestBody } from '../../../../../types';
import { FIELD_IDS } from '../../../../constants';
import mapSubmittedData from '.';
import { mockBody } from './mocks';

const {
  COMPANY_HOUSE: { INPUT, COMPANY_INCORPORATED },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/map-submitted-data', () => {
  describe(`when ${INPUT} success,and __typename fields are provided`, () => {
    it(`should return the formBody without ${INPUT} success,and __typename fields and change null fields in address to empty strings`, () => {
      const response = mapSubmittedData(mockBody);

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
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${INPUT} success, and __typename fields are not provided`, () => {
    const mockBodyWithoutFields = {
      ...mockBody,
    } as RequestBody;

    delete mockBodyWithoutFields[INPUT];
    // eslint-disable-next-line no-underscore-dangle
    delete mockBodyWithoutFields.__typename;
    delete mockBodyWithoutFields.registeredOfficeAddress;
    delete mockBodyWithoutFields.dateOfCreation;
    delete mockBodyWithoutFields.success;
    delete mockBodyWithoutFields.apiError;
    delete mockBodyWithoutFields.companyNumber;

    it(`should return the formBody without ${INPUT} success,and __typename fields and add an empty address object`, () => {
      const response = mapSubmittedData(mockBodyWithoutFields);

      const { _csrf, ...expectedBody } = mockBodyWithoutFields;
      expectedBody.address = {};

      expect(response).toEqual(expectedBody);
    });
  });
});
