import { mapRiskCategory, mapNbiIssueAvailable, filterCisCountries, mapCisCountry, mapCisCountries } from './map-cis-countries';
import { API } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../../types';

describe('server/helpers/mappings/map-cis-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      shortTermCoverAvailabilityDesc: 'A',
      ESRAClassificationDesc: 'B',
      NBIIssue: 'C',
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
      oecdRiskCategory: 2,
      shortTermCoverAvailabilityDesc: 'D',
      ESRAClassificationDesc: 'E',
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

  describe('filterCisCountries', () => {
    it('should return a list of countries without invalid countries defined in INVALID_CIS_COUNTRIES', () => {
      const mockCountriesWithInvalid = [
        mockCountries[0],
        {
          ...mockCountries[0],
          marketName: 'EC Market n/k',
        },
        {
          ...mockCountries[0],
          marketName: 'Non EC Market n/k',
        },
        {
          ...mockCountries[0],
          marketName: 'Non UK',
        },
        {
          ...mockCountries[0],
          marketName: 'Third Country',
        },
      ];

      const result = filterCisCountries(mockCountriesWithInvalid);

      const expected = [mockCountries[0]];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCisCountry', () => {
    it('should return an object', () => {
      const result = mapCisCountry(mockCountries[0]);

      const expected = {
        name: mockCountries[0].marketName,
        isoCode: mockCountries[0].isoCode,
        value: mockCountries[0].isoCode,
        riskCategory: mapRiskCategory(mockCountries[0].ESRAClassificationDesc),
        shortTermCover: mockCountries[0].shortTermCoverAvailabilityDesc,
        nbiIssueAvailable: mapNbiIssueAvailable(mockCountries[0].NBIIssue),
      } as Country;

      expect(result).toEqual(expected);
    });

    describe('when a selectedIsoCode is passed', () => {
      it('should return an object with selected option', () => {
        const mockSelectedIsoCode = mockCountries[0].isoCode;

        const result = mapCisCountry(mockCountries[0], mockSelectedIsoCode);

        const expected = {
          name: mockCountries[0].marketName,
          isoCode: mockCountries[0].isoCode,
          value: mockCountries[0].isoCode,
          riskCategory: mapRiskCategory(mockCountries[0].ESRAClassificationDesc),
          shortTermCover: mockCountries[0].shortTermCoverAvailabilityDesc,
          nbiIssueAvailable: mapNbiIssueAvailable(mockCountries[0].NBIIssue),
          selected: true,
        } as Country;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapCisCountries', () => {
    it('should returns array of filtered, mapped and sorted objects', () => {
      const mockSelectedIsoCode = mockCountries[0].isoCode;

      const filteredCountries = filterCisCountries(mockCountries);

      const result = mapCisCountries(filteredCountries, mockSelectedIsoCode);

      const expected = sortArrayAlphabetically(
        [mapCisCountry(mockCountries[0], mockSelectedIsoCode), mapCisCountry(mockCountries[1], mockSelectedIsoCode)],
        'name',
      );

      expect(result).toEqual(expected);
    });
  });
});
