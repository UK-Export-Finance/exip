import { mapRiskCategory, mapShortTermCoverAvailable, mapNbiIssueAvailable, mapCountry, mapCountries } from './map-countries';
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

  describe('mapShortTermCoverAvailable', () => {
    describe(`when the short term cover field is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
      it('should return true', () => {
        const result = mapShortTermCoverAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.YES);

        expect(result).toEqual(true);
      });
    });

    describe(`when the short term cover field is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC}`, () => {
      it('should return true', () => {
        const result = mapShortTermCoverAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC);

        expect(result).toEqual(true);
      });
    });

    describe(`when the short term cover field is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC}`, () => {
      it('should return true', () => {
        const result = mapShortTermCoverAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC);

        expect(result).toEqual(true);
      });
    });

    describe(`when the short term cover field is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER}`, () => {
      it('should return true', () => {
        const result = mapShortTermCoverAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const result = mapShortTermCoverAvailable('something else');

      expect(result).toEqual(false);
    });
  });

  describe('mapNbiIssueAvailable', () => {
    describe(`when the NBI issue field is ${API.CIS.NBI_ISSUE_AVAILABLE.YES}`, () => {
      it('should return true', () => {
        const result = mapNbiIssueAvailable(API.CIS.NBI_ISSUE_AVAILABLE.YES);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const result = mapNbiIssueAvailable(API.CIS.NBI_ISSUE_AVAILABLE.NO);

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
        shortTermCoverAvailable: mapShortTermCoverAvailable(mockCountries[0].shortTermCoverAvailabilityDesc),
        nbiIssueAvailable: mapNbiIssueAvailable(mockCountries[0].NBIIssue),
      } as Country;

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
          shortTermCoverAvailable: mapShortTermCoverAvailable(mockCountries[0].shortTermCoverAvailabilityDesc),
          nbiIssueAvailable: mapNbiIssueAvailable(mockCountries[0].NBIIssue),
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

      const expected = sortArrayAlphabetically([mapCountry(mockCountries[0], mockSelectedIsoCode), mapCountry(mockCountries[1], mockSelectedIsoCode)], 'name');

      expect(result).toEqual(expected);
    });
  });
});
