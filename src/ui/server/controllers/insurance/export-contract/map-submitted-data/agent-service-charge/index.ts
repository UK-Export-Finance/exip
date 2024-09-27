import { APPLICATION } from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString, stripCommas } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: { FIXED_SUM, PERCENTAGE },
    },
  },
} = APPLICATION;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_CURRENCY_CODE, FIXED_SUM_AMOUNT, METHOD },
  },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields.
 * If FIXED_SUM_AMOUNT is provided, map the value.
 * If CURRENCY_CODE or ALTERNATIVE_CURRENCY_CODE are provided, map currency fields.
 * If METHOD is an empty string, nullify the field.
 * If the METHOD is PERCENTAGE, nullify FIXED_SUM values.
 * If the METHOD is FIXED_SUM, nullify PERCENTAGE values.
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, FIXED_SUM_AMOUNT)) {
    populatedData[FIXED_SUM_AMOUNT] = stripCommas(String(populatedData[FIXED_SUM_AMOUNT]));
  }

  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    populatedData[FIXED_SUM_CURRENCY_CODE] = populatedData[CURRENCY_CODE];

    /**
     * If the currency code is not the alternative currency code,
     * nullify the alternative currency code
     * so currency code can be changed
     * (else if not null, the alternative currency code will be saved as the currency code when changing the answer)
     */
    if (populatedData[CURRENCY_CODE] !== ALTERNATIVE_CURRENCY_CODE) {
      populatedData[ALTERNATIVE_CURRENCY_CODE] = null;
    }

    /**
     * CURRENCY_CODE should never exist.
     * This is purely a UI field and so should not be included in the data.
     */
    delete populatedData[CURRENCY_CODE];
  }

  if (objectHasProperty(populatedData, ALTERNATIVE_CURRENCY_CODE)) {
    populatedData[FIXED_SUM_CURRENCY_CODE] = populatedData[ALTERNATIVE_CURRENCY_CODE];

    /**
     * ALTERNATIVE_CURRENCY_CODE should never exist.
     * This is purely a UI field and so should not be included in the data.
     */
    delete populatedData[ALTERNATIVE_CURRENCY_CODE];
  }

  /**
   * If METHOD is an empty string,
   * nullify the field.
   */
  if (isEmptyString(populatedData[METHOD])) {
    populatedData[METHOD] = null;
  }

  /**
   * If METHOD is FIXED_SUM,
   * nullify PERCENTAGE related fields.
   */
  if (formBody[METHOD] === FIXED_SUM) {
    populatedData[PERCENTAGE_CHARGE] = null;
  }

  /**
   * If METHOD is PERCENTAGE,
   * nullify FIXED_SUM related fields.
   */
  if (formBody[METHOD] === PERCENTAGE) {
    populatedData[PERCENTAGE_CHARGE] = Number(populatedData[PERCENTAGE_CHARGE]);
    populatedData[FIXED_SUM_AMOUNT] = null;
    populatedData[FIXED_SUM_CURRENCY_CODE] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
