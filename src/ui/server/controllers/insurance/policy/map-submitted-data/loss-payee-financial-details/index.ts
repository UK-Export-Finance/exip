import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody, ObjectType } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import stripHyphensAndSpacesFromString from '../../../../../helpers/strip-hyphens-and-spaces-from-string';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { IBAN, BIC_SWIFT_CODE },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if SORT_CODE, IBAN or BIC_SWIFT_CODE then run stripHyphensAndSpacesFromString to remove hyphens and spaces
 * capitalises IBAN and BIC_SWIFT_CODE
 * @param {RequestBody} formBody
 * @returns {ObjectType} populated data
 */
const mapSubmittedData = (formBody: RequestBody): ObjectType => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, SORT_CODE)) {
    populatedData[SORT_CODE] = stripHyphensAndSpacesFromString(formBody[SORT_CODE]);
  }

  if (objectHasProperty(populatedData, IBAN)) {
    populatedData[IBAN] = stripHyphensAndSpacesFromString(formBody[IBAN]).toUpperCase();
  }

  if (objectHasProperty(populatedData, BIC_SWIFT_CODE)) {
    populatedData[BIC_SWIFT_CODE] = stripHyphensAndSpacesFromString(formBody[BIC_SWIFT_CODE]).toUpperCase();
  }

  return populatedData;
};

export default mapSubmittedData;
