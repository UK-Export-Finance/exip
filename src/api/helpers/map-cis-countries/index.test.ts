import mapCisCountries, {
  mapRiskCategory,
  mapShortTermCoverAvailable,
  mapNbiIssueAvailable,
  canGetAQuoteOnline,
  canGetAQuoteByEmail,
  cannotGetAQuote,
  canApplyOffline,
  filterCisCountries,
  mapCisCountry,
} from '.';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, MappedCisCountry } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

// TODO improve test coverage at least with canGetAQuoteByEmail
// TODO: test coverage for mapShortTermCoverAvailable

describe('helpers/map-cis-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
    },
  ] as Array<CisCountry>;

  const { 1: initialMockCountry } = mockCountries;

  const mockCountryBase = {
    ...initialMockCountry,
    marketName: initialMockCountry.marketName,
    riskCategory: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    isoCode: initialMockCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
  };

  const mockMappedCountryBase = {
    name: mockCountryBase.marketName,
    isoCode: mockCountryBase.isoCode,
    riskCategory: CIS.RISK.HIGH,
    shortTermCover: true,
    canGetAQuoteOnline: true,
    canGetAQuoteByEmail: false,
    cannotGetAQuote: false,
    canApplyOnline: true,
    canApplyOffline: true,
    cannotApply: false,
  };

  describe('mapRiskCategory', () => {
    describe(`when the risk is '${CIS.RISK.STANDARD}'`, () => {
      it('should return simplified string', () => {
        const str = CIS.RISK.STANDARD;

        const result = mapRiskCategory(str);

        const expected = EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the risk is '${CIS.RISK.HIGH}'`, () => {
      it('should return the string', () => {
        const str = CIS.RISK.HIGH;

        const result = mapRiskCategory(str);

        expect(result).toEqual(str);
      });
    });

    describe(`when the risk is '${CIS.RISK.VERY_HIGH}'`, () => {
      it('should return the string', () => {
        const str = CIS.RISK.VERY_HIGH;

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
    describe(`when the NBI issue field is ${CIS.NBI_ISSUE_AVAILABLE.YES}`, () => {
      it('should return true', () => {
        const result = mapNbiIssueAvailable(CIS.NBI_ISSUE_AVAILABLE.YES);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const result = mapNbiIssueAvailable(CIS.NBI_ISSUE_AVAILABLE.NO);

      expect(result).toEqual(false);
    });
  });

  describe('canGetAQuoteOnline', () => {
    describe('when country has riskCategory, shortTermCover and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockMappedCountryBase,
          shortTermCover: true,
          nbiIssueAvailable: true,
        };

        const result = canGetAQuoteOnline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockMappedCountryBase,
        shortTermCover: false,
        nbiIssueAvailable: true,
      };

      const result = canGetAQuoteOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('canGetAQuoteByEmail', () => {
    describe('when country has riskCategory, shortTermCover but no nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockMappedCountryBase,
          shortTermCover: true,
          nbiIssueAvailable: false,
        };

        const result = canGetAQuoteByEmail(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockMappedCountryBase,
        shortTermCover: false,
        nbiIssueAvailable: false,
      };

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('cannotGetAQuote', () => {
    describe('when country does not have riskCategory, shortTermCover and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockMappedCountryBase,
          riskCategory: undefined,
          shortTermCoverAvailabilityDesc: false,
          nbiIssueAvailable: false,
        };

        const result = cannotGetAQuote(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockMappedCountryBase,
        shortTermCover: true,
        nbiIssueAvailable: true,
      };

      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('canApplyOffline', () => {
    describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER_AVAILABLE.ILC}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
        };

        const result = canApplyOffline(mockCountry.shortTermCoverAvailabilityDesc);

        expect(result).toEqual(true);
      });
    });

    describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER_AVAILABLE.CILC}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.CILC,
        };

        const result = canApplyOffline(mockCountry.shortTermCoverAvailabilityDesc);

        expect(result).toEqual(true);
      });
    });

    describe(`when shortTermCoverAvailabilityDesc is ${CIS.SHORT_TERM_COVER_AVAILABLE.REFER}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.REFER,
        };

        const result = canApplyOffline(mockCountry.shortTermCoverAvailabilityDesc);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCoverAvailabilityDesc: 'Something else',
      };

      const result = canApplyOffline(mockCountry.shortTermCoverAvailabilityDesc);

      expect(result).toEqual(false);
    });
  });

  describe('filterCisCountries', () => {
    it('should return a list of countries without invalid countries defined in INVALID_CIS_COUNTRIES', () => {
      const mockCountriesWithInvalid = [
        mockCountryBase,
        {
          ...mockCountryBase,
          marketName: 'EC Market n/k',
        },
        {
          ...mockCountryBase,
          marketName: 'Non EC Market n/k',
        },
        {
          ...mockCountryBase,
          marketName: 'Non UK',
        },
        {
          ...mockCountryBase,
          marketName: 'Third Country',
        },
      ];

      const result = filterCisCountries(mockCountriesWithInvalid);

      const expected = [mockCountryBase];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCisCountry', () => {
    it('should return an object', () => {
      const result = mapCisCountry(mockCountryBase);

      const mapped = {
        name: mockCountryBase.marketName,
        isoCode: mockCountryBase.isoCode,
        riskCategory: mapRiskCategory(mockCountryBase.ESRAClassificationDesc),
        shortTermCover: mapShortTermCoverAvailable(mockCountryBase.shortTermCoverAvailabilityDesc),
        nbiIssueAvailable: mapNbiIssueAvailable(mockCountryBase.NBIIssue),
        canGetAQuoteOnline: false,
        canGetAQuoteByEmail: false,
        cannotGetAQuote: false,
        canApplyOnline: false,
        canApplyOffline: false,
        cannotApply: false,
      } as MappedCisCountry;

      mapped.canGetAQuoteOnline = canGetAQuoteOnline(mapped);
      mapped.canGetAQuoteByEmail = canGetAQuoteByEmail(mapped);

      mapped.cannotGetAQuote = cannotGetAQuote(mapped);
      mapped.canApplyOnline = mapped.shortTermCover;
      mapped.canApplyOffline = canApplyOffline(mockCountryBase.shortTermCoverAvailabilityDesc);

      mapped.cannotApply = !mapped.canApplyOnline && !mapped.canApplyOffline;

      expect(result).toEqual(mapped);
    });
  });

  describe('mapCisCountries', () => {
    it('should returns array of filtered, mapped and sorted objects', () => {
      const filteredCountries = filterCisCountries(mockCountries);

      const result = mapCisCountries(filteredCountries);

      const { 0: firstCountry, 1: secondCountry } = mockCountries;

      const expected = sortArrayAlphabetically([mapCisCountry(firstCountry), mapCisCountry(secondCountry)], 'name');

      expect(result).toEqual(expected);
    });
  });
});
