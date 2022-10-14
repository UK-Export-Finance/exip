import { isCoverQuoteAvailable, canGetAQuoteOnline, canGetAQuoteByEmail, cannotGetAQuote, canApplyOnline, canApplyOffline, cannotApply } from './country-support';
import { API } from '../constants';

describe('server/helpers/country-support', () => {
  const mockCountryBase = {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    value: 'XAD',
    riskCategory: 'Standard',
    nbiIssueAvailable: true,
  };

  describe('isCoverQuoteAvailable', () => {
    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
      it('should return true', () => {
        const result = isCoverQuoteAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.YES);

        expect(result).toEqual(true);
      });
    });

    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC}`, () => {
      it('should return true', () => {
        const result = isCoverQuoteAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC);

        expect(result).toEqual(true);
      });
    });

    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC}`, () => {
      it('should return true', () => {
        const result = isCoverQuoteAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC);

        expect(result).toEqual(true);
      });
    });

    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER}`, () => {
      it('should return true', () => {
        const result = isCoverQuoteAvailable(API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const result = isCoverQuoteAvailable('something else');

      expect(result).toEqual(false);
    });
  });

  describe('canGetAQuoteOnline', () => {
    describe('when country has riskCategory, shortTermCover and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
          nbiIssueAvailable: true,
        };

        const result = canGetAQuoteOnline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.NO,
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
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
          nbiIssueAvailable: false,
        };

        const result = canGetAQuoteByEmail(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
        nbiIssueAvailable: true,
      };

      const result = canGetAQuoteByEmail(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('cannotGetAQuote', () => {
    describe('when country does not have riskCategory, shortTermCover and nbiIssueAvailable', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.NO,
          nbiIssueAvailable: false,
        };

        const result = cannotGetAQuote(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
        nbiIssueAvailable: true,
      };

      const result = cannotGetAQuote(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('canApplyOnline', () => {
    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
        };

        const result = canApplyOnline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCover: 'something else',
      };

      const result = canApplyOnline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('canApplyOffline', () => {
    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
        };

        const result = canApplyOffline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC,
        };

        const result = canApplyOffline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    describe(`when the shortTermCover is ${API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER}`, () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER,
        };

        const result = canApplyOffline(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const mockCountry = {
        ...mockCountryBase,
        shortTermCover: 'something else',
      };

      const result = canApplyOffline(mockCountry);

      expect(result).toEqual(false);
    });
  });

  describe('cannotApply', () => {
    describe('when canApplyOnline and canApplyOffline return false', () => {
      it('should return true', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: 'something else',
        };

        const result = cannotApply(mockCountry);

        expect(result).toEqual(true);
      });
    });

    describe('when canApplyOnline returns true', () => {
      it('should return false', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
        };

        const result = cannotApply(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when canApplyOffline returns true', () => {
      it('should return false', () => {
        const mockCountry = {
          ...mockCountryBase,
          shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
        };

        const result = cannotApply(mockCountry);

        expect(result).toEqual(false);
      });
    });
  });
});
