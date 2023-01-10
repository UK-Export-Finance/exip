import { RequestBody } from '../../../../../types';
import { FIELD_IDS } from '../../../../constants';
import mapSubmittedData from '.';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/map-submitted-data', () => {
  const mockBody = {
    [INPUT]: '8989898',
    __typename: 'CompaniesHouseResponse',
    companyName: 'testName',
    registeredOfficeAddress: {
      careOf: null,
      premises: null,
      addressLine1: 'line1',
      addressLine2: 'line2',
      locality: 'line3',
      region: 'line4',
      postalCode: 'line5',
      country: null,
      __typename: 'CompanyAddress',
    },
    companyNumber: '8989898',
    dateOfCreation: '2014-04-10',
    sicCodes: ['64999'],
    success: true,
  } as RequestBody;

  describe(`when ${INPUT} success,and __typename fields are provided`, () => {
    it(`should return the formBody without ${INPUT} success,and __typename fields`, () => {
      const response = mapSubmittedData(mockBody);

      const expected = {
        companyName: 'testName',
        registeredOfficeAddress: {
          careOf: null,
          premises: null,
          addressLine1: 'line1',
          addressLine2: 'line2',
          locality: 'line3',
          region: 'line4',
          postalCode: 'line5',
          country: null,
        },
        companyNumber: '8989898',
        dateOfCreation: '2014-04-10',
        sicCodes: ['64999'],
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${INPUT} success,and __typename fields are not provided`, () => {
    const mockBodyWithoutFields = {
      ...mockBody,
    } as RequestBody;

    delete mockBodyWithoutFields[INPUT];
    // eslint-disable-next-line no-underscore-dangle
    delete mockBodyWithoutFields.__typename;
    delete mockBodyWithoutFields.registeredOfficeAddress;
    delete mockBodyWithoutFields.success;

    it(`should return the formBody without ${INPUT} success,and __typename fields`, () => {
      const response = mapSubmittedData(mockBodyWithoutFields);

      expect(response).toEqual(mockBodyWithoutFields);
    });
  });
});
