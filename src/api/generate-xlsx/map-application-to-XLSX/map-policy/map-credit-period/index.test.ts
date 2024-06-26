import mapCreditPeriod from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-credit-period', () => {
  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true`, () => {
    it('should return an array of mapped fields', () => {
      const mockPolicy = {
        ...mockApplication.policy,
        [NEED_PRE_CREDIT_PERIOD]: true,
        [CREDIT_PERIOD_WITH_BUYER]: 'mock value',
      };

      const result = mapCreditPeriod(mockPolicy);

      const expected = [
        xlsxRow(String(FIELDS[NEED_PRE_CREDIT_PERIOD]), mapYesNoField({ answer: mockPolicy[NEED_PRE_CREDIT_PERIOD] })),
        xlsxRow(String(FIELDS[CREDIT_PERIOD_WITH_BUYER]), mockPolicy[CREDIT_PERIOD_WITH_BUYER]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is false`, () => {
    it('should return an array with one mapped field', () => {
      const mockPolicy = {
        ...mockApplication.policy,
        [NEED_PRE_CREDIT_PERIOD]: false,
      };

      const result = mapCreditPeriod(mockPolicy);

      const expected = [xlsxRow(String(FIELDS[NEED_PRE_CREDIT_PERIOD]), mapYesNoField({ answer: mockPolicy[NEED_PRE_CREDIT_PERIOD] }))];

      expect(result).toEqual(expected);
    });
  });
});
