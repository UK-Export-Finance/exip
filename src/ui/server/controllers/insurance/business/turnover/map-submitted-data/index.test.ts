import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '.';
import { mockBusinessTurnover } from '../../../../../test-mocks';
import { stripCommas } from '../../../../../helpers/string';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER } = EXPORTER_BUSINESS.TURNOVER;

describe('controllers/insurance/business/turnover/map-submitted-data', () => {
  describe('when all fields are provided and all number fields contain a comma', () => {
    it('should return the formBody with the commas replaced', () => {
      const mockBody = {
        _csrf: '1234',
        ...mockBusinessTurnover,
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [PERCENTAGE_TURNOVER]: stripCommas(mockBody[PERCENTAGE_TURNOVER]),
        [ESTIMATED_ANNUAL_TURNOVER]: stripCommas(mockBody[ESTIMATED_ANNUAL_TURNOVER]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when all fields are provided and none contain a comma', () => {
    it('should return the formBody', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
        [PERCENTAGE_TURNOVER]: '20',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when some fields are provided and none contain a comma', () => {
    it('should return the formBody with the populated fields populated, and the remaining as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
        [PERCENTAGE_TURNOVER]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (all are empty strings)', () => {
    it('should return the formBody with fields as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '',
        [PERCENTAGE_TURNOVER]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });
});
