import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '.';
import { mockBusinessNatureOfBusiness } from '../../../../../test-mocks';
import { stripCommas } from '../../../../../helpers/string';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

describe('controllers/insurance/business/map-submitted-data/your-business', () => {
  describe('when all fields are provided and all number fields contain a comma', () => {
    it('should return the formBody with the commas replaced', () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        ...mockBusinessNatureOfBusiness,
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: stripCommas(mockBody[YEARS_EXPORTING]),
        [EMPLOYEES_UK]: stripCommas(mockBody[EMPLOYEES_UK]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when all fields are provided and none contain a comma', () => {
    it('should return the formBody', () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: 'ABC',
        [YEARS_EXPORTING]: '20',
        [EMPLOYEES_UK]: '400',
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when some fields are provided and none contain a comma', () => {
    it('should return the formBody with the populated fields populated, and the remaining as empty strings', () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: 'ABC',
        [YEARS_EXPORTING]: '',
        [EMPLOYEES_UK]: '',
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (all are empty strings)', () => {
    it('should return the formBody with fields as empty strings', () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: '',
        [YEARS_EXPORTING]: '',
        [EMPLOYEES_UK]: '',
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
      };

      expect(response).toEqual(expected);
    });
  });
});
