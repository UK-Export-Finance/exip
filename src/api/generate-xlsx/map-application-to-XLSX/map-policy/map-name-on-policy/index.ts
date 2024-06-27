import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { ACCOUNT_FIELDS as CONTENT_STRINGS } from '../../../../content-strings/fields/insurance/account';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationPolicyContact } from '../../../../types';

const { FIELDS } = XLSX;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, NAME, POSITION },
  },
} = FIELD_IDS;

/**
 * mapNameOnPolicy
 * Map an application's "name on policy" fields into an array of objects for XLSX generation
 * @param {ApplicationPolicyContact} policyContact: Policy contact
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapNameOnPolicy = (policyContact: ApplicationPolicyContact) => {
  let mapped = [];

  if (policyContact[IS_SAME_AS_OWNER]) {
    const nameOnPolicy = `${policyContact[FIRST_NAME]} ${policyContact[LAST_NAME]} (${policyContact[EMAIL]})`;

    mapped = [xlsxRow(String(FIELDS.NAME_ON_POLICY[NAME]), nameOnPolicy), xlsxRow(String(FIELDS.NAME_ON_POLICY[POSITION]), policyContact[POSITION])];

    return mapped;
  }

  mapped = [
    xlsxRow(String(FIELDS.NAME_ON_POLICY[NAME]), FIELDS.SOMEONE_ELSE),
    xlsxRow(String(CONTENT_STRINGS[FIRST_NAME].LABEL), policyContact[FIRST_NAME]),
    xlsxRow(String(CONTENT_STRINGS[LAST_NAME].LABEL), policyContact[LAST_NAME]),
    xlsxRow(String(CONTENT_STRINGS[EMAIL].LABEL), policyContact[EMAIL]),
    xlsxRow(String(FIELDS.NAME_ON_POLICY[POSITION]), policyContact[POSITION]),
  ];

  return mapped;
};

export default mapNameOnPolicy;
