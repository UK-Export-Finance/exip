import mapSubmittedData from '.';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../types';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS },
} = BUSINESS_FIELD_IDS;

describe('controllers/insurance/business/map-submitted-data/company-details', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      [HAS_DIFFERENT_TRADING_NAME]: 'true',
      [DIFFERENT_TRADING_NAME]: 'test',
      [TRADING_ADDRESS]: 'false',
    };
  });

  describe(`when ${HAS_DIFFERENT_TRADING_NAME} is true and ${TRADING_ADDRESS} is populated`, () => {
    it('should return mockFormBody', () => {
      const response = mapSubmittedData(mockFormBody);

      expect(response).toEqual(mockFormBody);
    });
  });

  describe(`when ${HAS_DIFFERENT_TRADING_NAME} is false and ${DIFFERENT_TRADING_NAME} is populated`, () => {
    it(`should change ${DIFFERENT_TRADING_NAME} to be an empty string`, () => {
      mockFormBody[HAS_DIFFERENT_TRADING_NAME] = 'false';

      const response = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [DIFFERENT_TRADING_NAME]: '',
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${HAS_DIFFERENT_TRADING_NAME} is an empty string`, () => {
    it(`should remove ${HAS_DIFFERENT_TRADING_NAME}`, () => {
      mockFormBody[HAS_DIFFERENT_TRADING_NAME] = '';

      const response = mapSubmittedData(mockFormBody);

      const expected = {
        [DIFFERENT_TRADING_NAME]: 'test',
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
        [HAS_DIFFERENT_TRADING_NAME]: 'true',
        [DIFFERENT_TRADING_NAME]: 'test',
      };

      expect(response).toEqual(expected);
    });
  });
});
