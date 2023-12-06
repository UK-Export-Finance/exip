import { RequestBody } from '../../../../../../types';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapSubmittedData from '.';

const { ALTERNATIVE_TRADING_ADDRESS, FULL_ADDRESS } = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

describe('controllers/insurance/business/map-submitted-data/company-different-trading-address', () => {
  describe('when all fields are provided', () => {
    it(`should return the formBody without _csrf and replace ${ALTERNATIVE_TRADING_ADDRESS} with ${FULL_ADDRESS}`, () => {
      const mockBody = {
        _csrf: '1234',
        [ALTERNATIVE_TRADING_ADDRESS]: 'test',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [FULL_ADDRESS]: mockBody[ALTERNATIVE_TRADING_ADDRESS],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (empty string)', () => {
    it('should return the formBody as an empty object', () => {
      const mockBody = {
        _csrf: '1234',
        [ALTERNATIVE_TRADING_ADDRESS]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      expect(response).toEqual({});
    });
  });
});
