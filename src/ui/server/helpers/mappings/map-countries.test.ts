import {
  mapRiskCategory,
  mapIsSupported,
  mapCountry,
  mapCountries,
} from './map-countries';
import { API } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../../types';

describe('server/helpers/mappings/map-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      shortTermCoverAvailabilityDesc: 'A',
      ESRAClasificationDesc: 'B',
      NBIIssue: 'C',
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
      oecdRiskCategory: 2,
      shortTermCoverAvailabilityDesc: 'D',
      ESRAClasificationDesc: 'E',
      NBIIssue: 'F',
    },
  ] as Array<CisCountry>;

  describe('mapRiskCategory', () => {
    describe(`when the risk is '${API.CIS.RISK.STANDARD}'`, () => {
      it('should return simplified string', () => {
        const str = API.CIS.RISK.STANDARD;

        const result = mapRiskCategory(str);

        const expected = API.MAPPINGS.RISK.STANDARD;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the risk is '${API.CIS.RISK.HIGH}'`, () => {
      it('should return the string', () => {
        const str = API.CIS.RISK.HIGH;

        const result = mapRiskCategory(str);

        expect(result).toEqual(str);
      });
    });

    describe(`when the risk is '${API.CIS.RISK.VERY_HIGH}'`, () => {
      it('should return the string', () => {
        const str = API.CIS.RISK.VERY_HIGH;

        const result = mapRiskCategory(str);

        expect(result).toEqual(str);
      });
    });

    it('should return null', () => {
      const str = 'None';

      const result = mapRiskCategory(str);

      expect(result).toEqual(null);
    });
  });

  describe('mapIsSupported', () => {
    let mockCountry = {
      marketName: 'A',
      isoCode: 'B',
      shortTermCoverAvailabilityDesc: 'C',
      ESRAClasificationDesc: 'D',
      NBIIssue: 'E',
    } as CisCountry;

    describe('when a country has no riskCategory', () => {
      it('should return false', () => {
        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country does not have shortTermCoverAvailabilityDesc', () => {
      it('should return false', () => {
        mockCountry.riskCategory = API.CIS.RISK.STANDARD;
        mockCountry.shortTermCoverAvailabilityDesc = 'No';

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country does not have NBIIssue', () => {
      it('should return false', () => {
        mockCountry.riskCategory = API.CIS.RISK.STANDARD;
        mockCountry.NBIIssue = 'N';

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country has shortTermCoverAvailabilityDesc and NBIIssue', () => {
      it('should return true', () => {
        mockCountry.riskCategory = API.CIS.RISK.STANDARD;
        mockCountry.shortTermCoverAvailabilityDesc = 'Yes';
        mockCountry.NBIIssue = 'Y';

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should otherwise return false', () => {
      mockCountry.shortTermCoverAvailabilityDesc = '';
      mockCountry.NBIIssue = '';

      const result = mapIsSupported(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('mapCountry', () => {
    it('should return an object', () => {
      const result = mapCountry(mockCountries[0]);

      const expected = {
        name: mockCountries[0].marketName,
        isoCode: mockCountries[0].isoCode,
        value: mockCountries[0].isoCode,
        riskCategory: mapRiskCategory(mockCountries[0].ESRAClasificationDesc),
        isSupported: mapIsSupported(mockCountries[0]),
      } as Country;

      // expected.isSupported = mapIsSupported(mockCountries[0]);

      expect(result).toEqual(expected);
    });

    describe('when a selectedIsoCode is passed', () => {
      it('should return an object with selected option', () => {
        const mockSelectedIsoCode = mockCountries[0].isoCode;

        const result = mapCountry(mockCountries[0], mockSelectedIsoCode);

        const expected = {
          name: mockCountries[0].marketName,
          isoCode: mockCountries[0].isoCode,
          value: mockCountries[0].isoCode,
          riskCategory: mapRiskCategory(mockCountries[0].ESRAClasificationDesc),
          isSupported: mapIsSupported(mockCountries[0]),
          selected: true,
        } as Country;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapCountries', () => {
    it('should returns array of mapped, sorted objects', () => {
      const mockSelectedIsoCode = mockCountries[0].isoCode;

      const result = mapCountries(mockCountries, mockSelectedIsoCode);

      const expected = sortArrayAlphabetically([
        mapCountry(mockCountries[0], mockSelectedIsoCode),
        mapCountry(mockCountries[1], mockSelectedIsoCode),
      ], 'name');

      expect(result).toEqual(expected);
    });
  });
});
