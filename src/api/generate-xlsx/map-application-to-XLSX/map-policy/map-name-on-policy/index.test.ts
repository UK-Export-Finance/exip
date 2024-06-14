import mapNameOnPolicy from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { ACCOUNT_FIELDS as CONTENT_STRINGS } from '../../../../content-strings/fields/insurance/account';
import xlsxRow from '../../helpers/xlsx-row';
import { mockApplication } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, NAME, POSITION },
  },
} = FIELD_IDS;

const { policyContact } = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-name-on-policy', () => {
  describe(`when ${IS_SAME_AS_OWNER} is true`, () => {
    it('should return an array of mapped fields', () => {
      const mockPolicyContact = {
        ...policyContact,
        [IS_SAME_AS_OWNER]: true,
      };

      const result = mapNameOnPolicy(mockPolicyContact);

      const expected = [
        xlsxRow(String(FIELDS.NAME_ON_POLICY[NAME]), mockPolicyContact[NAME]),
        xlsxRow(String(FIELDS.NAME_ON_POLICY[POSITION]), mockPolicyContact[POSITION]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_SAME_AS_OWNER} is false`, () => {
    it('should return an array of mapped fields', () => {
      const mockPolicyContact = {
        ...policyContact,
        [IS_SAME_AS_OWNER]: false,
      };

      const result = mapNameOnPolicy(mockPolicyContact);

      const expected = [
        xlsxRow(String(FIELDS.NAME_ON_POLICY[NAME]), FIELDS.SOMEONE_ELSE),
        xlsxRow(String(CONTENT_STRINGS[FIRST_NAME].LABEL), mockPolicyContact[FIRST_NAME]),
        xlsxRow(String(CONTENT_STRINGS[LAST_NAME].LABEL), mockPolicyContact[LAST_NAME]),
        xlsxRow(String(FIELDS.NAME_ON_POLICY[POSITION]), mockPolicyContact[POSITION]),
      ];

      expect(result).toEqual(expected);
    });
  });
});
