import { objectHasKeysAndValues } from '../object';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { ApplicationNominatedLossPayee } from '../../../types';

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_IN_UK },
} = FIELD_IDS;

/**
 * shouldNullifyLossPayeeFinancialInternationalData
 * Check if we should nullify loss payee financial international data.
 * If IS_APPOINTED is true,
 * Or the location is IS_LOCATED_IN_UK
 * and the application has some financial international data,
 * the international data should be nullified.
 * @param {String} isAppointed: Is appointed form field
 * @param {String} location: Loss payee location form field
 * @param {ApplicationNominatedLossPayee} lossPayeeData: Loss payee data
 * @returns {Boolean}
 */
const shouldNullifyLossPayeeFinancialInternationalData = (isAppointed: string, location: string, lossPayeeData: ApplicationNominatedLossPayee) => {
  const {
    financialInternational: { id, ...financialInternationalFields },
  } = lossPayeeData;

  const hasData = objectHasKeysAndValues(financialInternationalFields);

  const isNotAppointed = isAppointed === 'false';

  const locatedInUK = location === IS_LOCATED_IN_UK;

  if ((isNotAppointed || locatedInUK) && hasData) {
    return true;
  }

  return false;
};

export default shouldNullifyLossPayeeFinancialInternationalData;
