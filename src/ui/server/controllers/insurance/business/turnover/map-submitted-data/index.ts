import { objectHasProperty } from '../../../../../helpers/object';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { stripCommas } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORTER_BUSINESS: {
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
  },
} = INSURANCE_FIELD_IDS;

/**
 * maps turnover formBody fields.
 * 1) Remove commands from monetary input fields (commas are valid input).
 * 2) Transform "currency code" into "turnover currency code".
 * 3) Delete "currency code" and "alternative currency code" fields.
 * @param {RequestBody} formBody
 * @returns {Object} mapped / populated data
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, ESTIMATED_ANNUAL_TURNOVER)) {
    populatedData[ESTIMATED_ANNUAL_TURNOVER] = stripCommas(populatedData[ESTIMATED_ANNUAL_TURNOVER]);
  }

  if (objectHasProperty(populatedData, PERCENTAGE_TURNOVER)) {
    populatedData[PERCENTAGE_TURNOVER] = stripCommas(populatedData[PERCENTAGE_TURNOVER]);
  }

  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    if (populatedData[CURRENCY_CODE] === ALTERNATIVE_CURRENCY_CODE) {
      populatedData[TURNOVER_CURRENCY_CODE] = populatedData[ALTERNATIVE_CURRENCY_CODE];
    } else {
      populatedData[TURNOVER_CURRENCY_CODE] = populatedData[CURRENCY_CODE];
    }

    delete populatedData[CURRENCY_CODE];
    delete populatedData[ALTERNATIVE_CURRENCY_CODE];
  }

  return populatedData;
};

export default mapSubmittedData;
