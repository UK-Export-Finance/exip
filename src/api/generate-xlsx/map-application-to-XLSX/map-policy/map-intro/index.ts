import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import formatDate from '../../../../helpers/format-date';
import { ApplicationPolicy } from '../../../../types';

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  POLICY_TYPE,
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = FIELD_IDS;

/**
 * mapIntro
 * Map an application's policy "intro" fields into an array of objects for XLSX generation
 * @param {ApplicationPolicy} policy
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapIntro = (policy: ApplicationPolicy) => {
  const mapped = [
    xlsxRow(SECTION_TITLES.POLICY, ''),
    xlsxRow(String(FIELDS[POLICY_TYPE]), policy[POLICY_TYPE]),
    xlsxRow(String(FIELDS[REQUESTED_START_DATE]), formatDate(policy[REQUESTED_START_DATE], 'dd-MMM-yy')),
  ];

  return mapped;
};

export default mapIntro;
