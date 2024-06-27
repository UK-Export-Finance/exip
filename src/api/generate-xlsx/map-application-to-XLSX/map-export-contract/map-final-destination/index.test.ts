import mapFinalDestination from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, mockCountries } from '../../../../test-mocks';

const CONTENT_STRINGS = EXPORT_CONTRACT_FIELDS.ABOUT_GOODS_OR_SERVICES;

const { FIELDS } = XLSX;

const {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
} = FIELD_IDS;

const { exportContract } = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract/map-final-destination', () => {
  describe(`when ${FINAL_DESTINATION_KNOWN} is true`, () => {
    const mockExportContract = {
      ...exportContract,
      [FINAL_DESTINATION_KNOWN]: true,
    };

    const finalDestinationKnownAnswer = mockExportContract[FINAL_DESTINATION_KNOWN];

    it('should return an array of mapped fields', () => {
      const result = mapFinalDestination(mockExportContract, mockCountries);

      const country = getCountryByIsoCode(mockCountries, mockExportContract[FINAL_DESTINATION]);

      const expected = [
        xlsxRow(String(FIELDS.EXPORT_CONTRACT[FINAL_DESTINATION_KNOWN]), mapYesNoField({ answer: finalDestinationKnownAnswer })),
        xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION]), String(country)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is false`, () => {
    const mockExportContract = {
      ...exportContract,
      [FINAL_DESTINATION_KNOWN]: false,
    };

    const finalDestinationKnownAnswer = mockExportContract[FINAL_DESTINATION_KNOWN];

    it('should return an array with one field', () => {
      const result = mapFinalDestination(mockExportContract, mockCountries);

      const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[FINAL_DESTINATION_KNOWN]), mapYesNoField({ answer: finalDestinationKnownAnswer }))];

      expect(result).toEqual(expected);
    });
  });
});
