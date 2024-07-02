import { APPLICATION } from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';
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
    AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD },
  },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields.
 * If the METHOD is PERCENTAGE, map PERCENTAGE fields, nullify FIXED_SUM values.
 * If the METHOD is FIXED_SUM, map FIXED_SUM fields, nullify PERCENTAGE values.
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (formBody[METHOD] === FIXED_SUM) {
    populatedData[FIXED_SUM_AMOUNT] = String(populatedData[FIXED_SUM_AMOUNT]);
    populatedData[PERCENTAGE_CHARGE] = null;
  }

  if (formBody[METHOD] === PERCENTAGE) {
    populatedData[PERCENTAGE_CHARGE] = Number(populatedData[PERCENTAGE_CHARGE]);
    populatedData[FIXED_SUM_AMOUNT] = null;
    populatedData[FIXED_SUM_CURRENCY_CODE] = null;
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

  if (isEmptyString(populatedData[METHOD])) {
    populatedData[METHOD] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
