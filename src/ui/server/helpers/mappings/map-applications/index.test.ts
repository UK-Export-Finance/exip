import { mapApplication, mapApplications } from '.';
import { DEFAULT } from '../../../content-strings';
import formatDate from '../../date/format-date';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import mapInsuredFor from './map-insured-for';
import { mockApplication, mockApplications } from '../../../test-mocks';

describe('server/helpers/mappings/map-applications', () => {
  describe('mapApplication', () => {
    it('should return a mapped application', () => {
      const result = mapApplication(mockApplication);

      const { status, updatedAt, referenceNumber, buyer } = mockApplication;

      const expected = {
        status,
        lastUpdated: formatDate(new Date(updatedAt)),
        referenceNumber,
        buyerLocation: buyer?.country?.name ?? DEFAULT.EMPTY,
        buyerName: replaceCharacterCodesWithCharacters(buyer.companyOrOrganisationName),
        insuredFor: mapInsuredFor(mockApplication),
      };

      expect(result).toEqual(expected);
    });

    describe('when application.buyer.country.name does not exist', () => {
      it('should return buyerLocation as default empty string', () => {
        const result = mapApplication({
          ...mockApplication,
          buyer: {
            ...mockApplication.buyer,
            country: {
              name: '',
            },
          },
        });

        const expected = DEFAULT.EMPTY;

        expect(result.buyerLocation).toEqual(expected);
      });
    });

    describe('when application.buyer.companyOrOrganisationName does not exist', () => {
      it('should return buyerName as default empty string', () => {
        const result = mapApplication({
          ...mockApplication,
          buyer: {
            ...mockApplication.buyer,
            companyOrOrganisationName: '',
          },
        });

        const expected = DEFAULT.EMPTY;

        expect(result.buyerName).toEqual(expected);
      });
    });
  });

  describe('mapApplications', () => {
    it('should return mapped applications with mapApplication function', () => {
      const result = mapApplications(mockApplications);

      const expected = [mapApplication(mockApplications[0]), mapApplication(mockApplications[1])];

      expect(result).toEqual(expected);
    });
  });
});
