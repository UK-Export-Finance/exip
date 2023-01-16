import mapSicCodes from './map-sic-codes';
import { SicCodeResponse } from '../../../types';

describe('server/helpers/mappings/map-sic-codes', () => {
  describe('when sic codes array is populated', () => {
    it('should return an array of sic codes in string format', () => {
      const sicCodes = [
        {
          id: 'clcyyxldc0634m8novkr94spo',
          sicCode: '64999',
          __typename: 'ExporterCompanySicCode',
        } as SicCodeResponse,
        {
          id: 'clcyyxldc0634m8novkr94spo',
          sicCode: '12345',
          __typename: 'ExporterCompanySicCode',
        } as SicCodeResponse,
      ];

      const response = mapSicCodes(sicCodes);

      expect(response).toEqual([sicCodes[0].sicCode, sicCodes[1].sicCode]);
    });
  });
});
