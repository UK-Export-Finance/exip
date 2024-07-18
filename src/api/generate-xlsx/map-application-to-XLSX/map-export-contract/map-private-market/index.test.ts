import mapPrivateMarket from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication, mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const {
  exportContract: { privateMarket },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-private-market', () => {
  describe('when the total contract value is over the threshold', () => {
    describe(`when ${ATTEMPTED} is true`, () => {
      it('should return an array of mapped fields', () => {
        const mockPrivateMarket = {
          ...privateMarket,
          [ATTEMPTED]: true,
        };

        const application = mockApplicationSinglePolicyTotalContractValueOverThreshold;

        application.exportContract.privateMarket = mockPrivateMarket;

        const result = mapPrivateMarket(application);

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

        const application = mockApplicationSinglePolicyTotalContractValueOverThreshold;

        application.exportContract.privateMarket = mockPrivateMarket;

        const result = mapPrivateMarket(application);

        const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: mockPrivateMarket[ATTEMPTED] }))];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when the total contract value is NOT over the threshold', () => {
    it('should return an empty array', () => {
      const result = mapPrivateMarket(mockApplication);

      expect(result).toEqual([]);
    });
  });
});
