import mapPrivateMarket from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const {
  eligibility,
  exportContract: { privateMarket },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-private-market', () => {
  describe(`when the total contract value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    const mockTotalContractValue = {
      ...eligibility.totalContractValue,
      value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
    };

    describe(`when ${ATTEMPTED} is true`, () => {
      it('should return an array of mapped fields', () => {
        const mockPrivateMarket = {
          ...privateMarket,
          [ATTEMPTED]: true,
        };

        const result = mapPrivateMarket(mockPrivateMarket, mockTotalContractValue);

        const expected = [
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarket[ATTEMPTED] })),
          xlsxRow(String(FIELDS.EXPORT_CONTRACT[DECLINED_DESCRIPTION]), mockPrivateMarket[DECLINED_DESCRIPTION]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ATTEMPTED} is false`, () => {
      it('should return an array with one field', () => {
        const mockPrivateMarket = {
          ...privateMarket,
          [ATTEMPTED]: false,
        };

        const result = mapPrivateMarket(mockPrivateMarket, mockTotalContractValue);

        const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarket[ATTEMPTED] }))];

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when the total contract value is NOT ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    it('should return an empty array', () => {
      const mockTotalContractValue = {
        ...eligibility.totalContractValue,
        value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
      };

      const result = mapPrivateMarket(privateMarket, mockTotalContractValue);

      expect(result).toEqual([]);
    });
  });
});
