import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { ApplicationPolicy } from '../../../../types';

const { FIELDS } = XLSX;

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = FIELD_IDS;

/**
 * mapJointlyInsuredParty
 * Map an application's "jointly insured party" fields into an array of objects for XLSX generation
 * @param {ApplicationJointlyInsuredParty} party: Application's jointly insured party
 * @param {Array<Country>} countries: Countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapCreditPeriod = (policy: ApplicationPolicy) => {
  const needCreditPrePeriod = policy[NEED_PRE_CREDIT_PERIOD];

  let mapped = [xlsxRow(String(FIELDS[NEED_PRE_CREDIT_PERIOD]), mapYesNoField({ answer: needCreditPrePeriod }))];

  if (needCreditPrePeriod) {
    mapped = [...mapped, xlsxRow(String(FIELDS[CREDIT_PERIOD_WITH_BUYER]), policy[CREDIT_PERIOD_WITH_BUYER])];
  }

  return mapped;
};

export default mapCreditPeriod;
