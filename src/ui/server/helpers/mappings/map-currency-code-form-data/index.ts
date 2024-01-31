import { objectHasProperty } from '../../object';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { RequestBody } from '../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * mapCurrencyCodeFormData
 * Map currency code form data. This handles the following scenarios:
 * - Currency code is submitted, no alternative currency code.
 * - Currency code is submitted as "alternative". Assign the alternative code to the currency code field.
 * - Currency code is submitted as CURRENCY_CODE, but the populated data should have a bespoke field ID.
 * - In either instance, delete the "alternative currency code" field.
 * @param {Express.Request.body} formBody: Form data
 * @param {String} fieldId: Currency code field ID
 * @returns {Object} Mapped object with currency field.
 */
const mapCurrencyCodeFormData = (formBody: RequestBody, fieldId = CURRENCY_CODE) => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, fieldId)) {
    if (populatedData[fieldId] === ALTERNATIVE_CURRENCY_CODE) {
      populatedData[fieldId] = populatedData[ALTERNATIVE_CURRENCY_CODE];
    } else if (populatedData[CURRENCY_CODE]) {
      populatedData[fieldId] = populatedData[CURRENCY_CODE];
    }

    delete populatedData[ALTERNATIVE_CURRENCY_CODE];
  }

  return populatedData;
};

export default mapCurrencyCodeFormData;
