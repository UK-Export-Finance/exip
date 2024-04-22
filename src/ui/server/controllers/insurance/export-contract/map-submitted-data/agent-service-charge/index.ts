import { APPLICATION } from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
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
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE, METHOD },
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

  if (formBody[METHOD] === PERCENTAGE) {
    populatedData[CHARGE_PERCENTAGE] = Number(populatedData[CHARGE_PERCENTAGE]);
    populatedData[FIXED_SUM_AMOUNT] = null;

    // TODO: when other PRs are merged
    // TODO: FIXED_SUM_AMOUNT_CURRENCY_CODE
  }

  if (formBody[METHOD] === FIXED_SUM) {
    populatedData[FIXED_SUM_AMOUNT] = Number(populatedData[FIXED_SUM_AMOUNT]);
    populatedData[CHARGE_PERCENTAGE] = null;
  }

  if (isEmptyString(populatedData[METHOD])) {
    populatedData[METHOD] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
