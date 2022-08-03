const {
  mapRiskCategory,
  mapIsSupported,
  mapCountry,
  mapCountries,
} = require('./map-countries');
const { API } = require('../../constants');
const sortArrayAlphabetically = require('../sort-array-alphabetically');

describe('server/helpers/mappings/map-countries', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      oecdRiskCategory: 1,
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
      oecdRiskCategory: 2,
    },
  ];

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
    describe('when a country has no riskCategory', () => {
      it('should return false', () => {
        const mockCountry = {};

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country has a null riskCategory', () => {
      it('should return false', () => {
        const mockCountry = {
          riskCategory: null,
        };

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country does not have shortTermCoverAvailabilityDesc', () => {
      it('should return false', () => {
        const mockCountry = {
          riskCategory: API.CIS.RISK.STANDARD,
          shortTermCoverAvailabilityDesc: 'No',
        };

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country does not have NBIIssue', () => {
      it('should return false', () => {
        const mockCountry = {
          riskCategory: API.CIS.RISK.STANDARD,
          NBIIssue: 'N',
        };

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(false);
      });
    });

    describe('when a country has shortTermCoverAvailabilityDesc and NBIIssue', () => {
      it('should return true', () => {
        const mockCountry = {
          riskCategory: API.CIS.RISK.STANDARD,
          shortTermCoverAvailabilityDesc: 'Yes',
          NBIIssue: 'Y',
        };

        const result = mapIsSupported(mockCountry);

        expect(result).toEqual(true);
      });
    });

    it('should otherwise return false', () => {
      const mockCountry = {
        riskCategory: API.CIS.RISK.STANDARD,
      };

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
      };

      expected.isSupported = mapIsSupported(expected);

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
          selected: true,
        };

        expected.isSupported = mapIsSupported(expected);

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
