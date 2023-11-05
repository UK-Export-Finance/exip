import { RequestBody } from '../../../../../../types';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '.';
import { mockBusinessNatureOfBusiness } from '../../../../../test-mocks';
import { stripCommas } from '../../../../../helpers/string';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

describe('controllers/insurance/business/nature-of-business/map-submitted-data', () => {
  describe('when all fields are provided and all number fields contain a comma', () => {
    it('should return the formBody with the commas replaced', () => {
      const mockBody = {
        _csrf: '1234',
        ...mockBusinessNatureOfBusiness,
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: stripCommas(mockBody[YEARS_EXPORTING]),
        [EMPLOYEES_UK]: stripCommas(mockBody[EMPLOYEES_UK]),
        [EMPLOYEES_INTERNATIONAL]: stripCommas(mockBody[EMPLOYEES_INTERNATIONAL]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when all fields are provided and none contain a comma', () => {
    it('should return the formBody', () => {
      const mockBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: 'ABC',
        [YEARS_EXPORTING]: '20',
        [EMPLOYEES_INTERNATIONAL]: '1000',
        [EMPLOYEES_UK]: '400',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
        [EMPLOYEES_INTERNATIONAL]: mockBody[EMPLOYEES_INTERNATIONAL],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when some fields are provided and none contain a comma', () => {
    it('should return the formBody with the populated fields populated, and the remaining as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: 'ABC',
        [YEARS_EXPORTING]: '',
        [EMPLOYEES_INTERNATIONAL]: '',
        [EMPLOYEES_UK]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
        [EMPLOYEES_INTERNATIONAL]: mockBody[EMPLOYEES_INTERNATIONAL],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (all are empty strings)', () => {
    it('should return the formBody with fields as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [GOODS_OR_SERVICES]: '',
        [YEARS_EXPORTING]: '',
        [EMPLOYEES_INTERNATIONAL]: '',
        [EMPLOYEES_UK]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [GOODS_OR_SERVICES]: mockBody[GOODS_OR_SERVICES],
        [YEARS_EXPORTING]: mockBody[YEARS_EXPORTING],
        [EMPLOYEES_UK]: mockBody[EMPLOYEES_UK],
        [EMPLOYEES_INTERNATIONAL]: mockBody[EMPLOYEES_INTERNATIONAL],
      };

      expect(response).toEqual(expected);
    });
  });
});
