import mapHowWasTheContractAwarded from '.';
import { EXPORT_CONTRACT_AWARD_METHOD } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import xlsxRow from '../../helpers/xlsx-row';
import { invalidId, mockApplication } from '../../../../test-mocks';

const { OPEN_TENDER, DIRECT_AWARD, COMPETITIVE_BIDDING, NEGOTIATED_CONTRACT, OTHER } = EXPORT_CONTRACT_AWARD_METHOD;

const CONTENT_STRINGS = EXPORT_CONTRACT_FIELDS.HOW_WAS_THE_CONTRACT_AWARDED;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = FIELD_IDS;

const { exportContract } = mockApplication;

const expectedTitle = `${String(CONTENT_STRINGS[AWARD_METHOD].SUMMARY?.TITLE)}?`;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract/map-how-was-the-contract-awarded', () => {
  describe(`when awardMethodId is ${OTHER.DB_ID}`, () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: OTHER.DB_ID,
    };

    it('should return a mapped field', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, mockExportContract[OTHER_AWARD_METHOD]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when awardMethodId is ${NEGOTIATED_CONTRACT.DB_ID}`, () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: NEGOTIATED_CONTRACT.DB_ID,
    };

    it('should return a mapped field', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, NEGOTIATED_CONTRACT.VALUE);

      expect(result).toEqual(expected);
    });
  });

  describe(`when awardMethodId is ${OPEN_TENDER.DB_ID}`, () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: OPEN_TENDER.DB_ID,
    };

    it('should return a mapped field', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, OPEN_TENDER.VALUE);

      expect(result).toEqual(expected);
    });
  });

  describe(`when awardMethodId is ${DIRECT_AWARD.DB_ID}`, () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: DIRECT_AWARD.DB_ID,
    };

    it('should return a mapped field', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, DIRECT_AWARD.VALUE);

      expect(result).toEqual(expected);
    });
  });

  describe(`when awardMethodId is ${COMPETITIVE_BIDDING.DB_ID}`, () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: COMPETITIVE_BIDDING.DB_ID,
    };

    it('should return a mapped field', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, COMPETITIVE_BIDDING.VALUE);

      expect(result).toEqual(expected);
    });
  });

  describe('when an award method is not recognised', () => {
    const mockExportContract = {
      ...exportContract,
      awardMethodId: invalidId,
    };

    it('should return a mapped field with en empty answer', () => {
      const result = mapHowWasTheContractAwarded(mockExportContract);

      const expected = xlsxRow(expectedTitle, '');

      expect(result).toEqual(expected);
    });
  });
});
