import mapPrivateMarket from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  },
  MIGRATED_FROM_V1_TO_V2,
} = FIELD_IDS;

const {
  eligibility,
  exportContract: { privateMarket },
} = mockApplication;

const mockTotalContractValueOverThreshold = {
  ...eligibility.totalContractValue,
  value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
};

const mockTotalContractValueUnderThreshold = {
  ...eligibility.totalContractValue,
  value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
};

const mockPrivateMarketAttemptedTrue = {
  ...privateMarket,
  [ATTEMPTED]: true,
};

const mockPrivateMarketAttemptedFalse = {
  ...privateMarket,
  [ATTEMPTED]: false,
};

describe('api/generate-xlsx/map-application-to-xlsx/map-private-market', () => {
  describe(`when the total contract value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    describe(`when ${ATTEMPTED} is true`, () => {
      it('should return an array of mapped fields', () => {
        const result = mapPrivateMarket(mockPrivateMarketAttemptedTrue, mockTotalContractValueOverThreshold, false);

        const expected = [
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarketAttemptedTrue[ATTEMPTED] })),
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[DECLINED_DESCRIPTION]), mockPrivateMarketAttemptedTrue[DECLINED_DESCRIPTION]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ATTEMPTED} is false`, () => {
      it('should return an array with one field', () => {
        const result = mapPrivateMarket(mockPrivateMarketAttemptedFalse, mockTotalContractValueOverThreshold, false);

        const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarketAttemptedFalse[ATTEMPTED] }))];

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when ${MIGRATED_FROM_V1_TO_V2} is true`, () => {
    describe(`when ${ATTEMPTED} is true`, () => {
      it('should return an array of mapped fields', () => {
        const result = mapPrivateMarket(mockPrivateMarketAttemptedTrue, mockTotalContractValueUnderThreshold, true);

        const expected = [
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarketAttemptedTrue[ATTEMPTED] })),
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[DECLINED_DESCRIPTION]), mockPrivateMarketAttemptedTrue[DECLINED_DESCRIPTION]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ATTEMPTED} is false`, () => {
      it('should return an array with one field', () => {
        const result = mapPrivateMarket(mockPrivateMarketAttemptedFalse, mockTotalContractValueUnderThreshold, true);

        const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarketAttemptedFalse[ATTEMPTED] }))];

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when the total contract value is NOT ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE} and ${MIGRATED_FROM_V1_TO_V2} is false`, () => {
    it('should return an empty array', () => {
      const result = mapPrivateMarket(privateMarket, mockTotalContractValueUnderThreshold, false);

      expect(result).toEqual([]);
    });
  });
});
