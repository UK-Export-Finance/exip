import { mapApplication, mapApplications } from '.';
import { DATE_FORMAT } from '../../../constants';
import { BUTTONS, DEFAULT } from '../../../content-strings';
import formatDate from '../../date/format-date';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import mapValue from './map-value';
import { mockApplication, mockApplications } from '../../../test-mocks';

describe('server/helpers/mappings/map-applications', () => {
  describe('mapApplication', () => {
    it('should return a mapped application', () => {
      const result = mapApplication(mockApplication);

      const { status, submissionDate, referenceNumber, buyer } = mockApplication;

      const expected = {
        status,
        referenceNumber,
        buyerLocation: buyer.country.name,
        buyerName: replaceCharacterCodesWithCharacters(buyer.companyOrOrganisationName),
        value: mapValue(mockApplication),
        submitted: formatDate(new Date(submissionDate), DATE_FORMAT.SHORT_MONTH),
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

    describe('when application.submissionDate does not exist', () => {
      it('should return submitted as default empty string', () => {
        const result = mapApplication({
          ...mockApplication,
          submissionDate: '',
        });

        const expected = BUTTONS.CONTINUE;

        expect(result.submitted).toEqual(expected);
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
