import mapAppointedLossPayee from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../content-strings/fields/insurance';
import xlsxRow from '../../../helpers/xlsx-row';
import mapYesNoField from '../../../helpers/map-yes-no-field';
import mockApplication from '../../../../../test-mocks/mock-application';

const { FIELDS } = XLSX;

const CONTENT_STRINGS = POLICY_FIELDS.LOSS_PAYEE_DETAILS;

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { LOCATION, NAME: LOSS_PAYEE_NAME },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-loss-payee/map-appointed-loss-payee', () => {
  describe('when an application has an assigned loss payee', () => {
    it('should return an array of mapped loss payee fields', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_APPOINTED]: false,
      };

      const result = mapAppointedLossPayee(mockLossPayee);

      const expected = [xlsxRow(String(FIELDS[IS_APPOINTED]), mapYesNoField({ answer: mockLossPayee[IS_APPOINTED] }))];

      expect(result).toEqual(expected);
    });
  });

  describe('when an application does NOT have an assigned loss payee', () => {
    it('should return an xlsxRow', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_APPOINTED]: true,
      };

      const result = mapAppointedLossPayee(mockLossPayee);

      const expected = [
        xlsxRow(String(FIELDS[IS_APPOINTED]), mapYesNoField({ answer: mockLossPayee[IS_APPOINTED] })),
        xlsxRow(String(CONTENT_STRINGS[LOSS_PAYEE_NAME].SUMMARY?.TITLE), mockLossPayee[LOSS_PAYEE_NAME]),
        xlsxRow(String(CONTENT_STRINGS[LOCATION].LABEL), 'TODO'),
      ];

      expect(result).toEqual(expected);
    });
  });
});
