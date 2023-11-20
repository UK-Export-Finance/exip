import mapSubmittedData from '.';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME, ALTERNATIVE_TRADING_NAME, TRADING_ADDRESS },
} = BUSINESS_FIELD_IDS;

describe('controllers/insurance/business/map-submitted-data/company-details', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      [TRADING_NAME]: 'true',
      [ALTERNATIVE_TRADING_NAME]: 'test',
      [TRADING_ADDRESS]: 'false',
    };
  });

  describe(`when ${TRADING_NAME} is true and ${TRADING_ADDRESS} is populated`, () => {
    it('should return mockFormBody', () => {
      const response = mapSubmittedData(mockFormBody);

      expect(response).toEqual(mockFormBody);
    });
  });

  describe(`when ${TRADING_NAME} is false and ${ALTERNATIVE_TRADING_NAME} is populated`, () => {
    it(`should change ${ALTERNATIVE_TRADING_NAME} to be an empty string`, () => {
      mockFormBody[TRADING_NAME] = 'false';

      const response = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [ALTERNATIVE_TRADING_NAME]: '',
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${TRADING_NAME} is an empty string`, () => {
    it(`should remove ${TRADING_NAME}`, () => {
      mockFormBody[TRADING_NAME] = '';

      const response = mapSubmittedData(mockFormBody);

      const expected = {
        [ALTERNATIVE_TRADING_NAME]: 'test',
        [TRADING_ADDRESS]: 'false',
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${TRADING_ADDRESS} is an empty string`, () => {
    it(`should remove ${TRADING_ADDRESS}`, () => {
      mockFormBody[TRADING_ADDRESS] = '';

      const response = mapSubmittedData(mockFormBody);

      const expected = {
        [TRADING_NAME]: 'true',
        [ALTERNATIVE_TRADING_NAME]: 'test',
      };

      expect(response).toEqual(expected);
    });
  });
});
