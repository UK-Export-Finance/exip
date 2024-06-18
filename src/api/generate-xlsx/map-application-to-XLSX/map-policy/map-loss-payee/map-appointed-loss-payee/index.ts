import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../content-strings/fields/insurance';
import xlsxRow from '../../../helpers/xlsx-row';
import mapYesNoField from '../../../helpers/map-yes-no-field';
import mapLossPayeeLocation from './map-location';
import { ApplicationNominatedLossPayee } from '../../../../../types';

const { FIELDS } = XLSX;

const CONTENT_STRINGS = POLICY_FIELDS.LOSS_PAYEE_DETAILS;

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { LOCATION, NAME: LOSS_PAYEE_NAME },
} = FIELD_IDS;

/**
 * mapAppointedLossPayee
 * If an application has a loss payee,
 * Map the generic loss payee fields into an array of objects for XLSX generation
 * @param {ApplicationNominatedLossPayee} lossPayee
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAppointedLossPayee = (lossPayee: ApplicationNominatedLossPayee) => {
  let mapped = [xlsxRow(String(FIELDS[IS_APPOINTED]), mapYesNoField({ answer: lossPayee[IS_APPOINTED] }))];

  if (lossPayee[IS_APPOINTED]) {
    mapped = [
      ...mapped,
      xlsxRow(String(CONTENT_STRINGS[LOSS_PAYEE_NAME].SUMMARY?.TITLE), lossPayee[LOSS_PAYEE_NAME]),
      xlsxRow(String(CONTENT_STRINGS[LOCATION].LABEL), mapLossPayeeLocation(lossPayee)),
    ];
  }

  return mapped;
};

export default mapAppointedLossPayee;
