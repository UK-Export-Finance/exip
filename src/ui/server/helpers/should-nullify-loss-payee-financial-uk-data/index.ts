import { objectHasKeysAndValues } from '../object';
import { ApplicationNominatedLossPayee } from '../../../types';

/**
 * shouldNullifyLossPayeeFinancialUkData
 * Check if we should nullify loss payee financial UK data.
 * If IS_APPOINTED is true and the application has some financial UK data, the charge data should be nullified.
 * @param {String} isAppointed: Is appointed form field
 * @param {ApplicationNominatedLossPayee} lossPayeeData: Loss payee data
 * @returns {Boolean}
 */
const shouldNullifyLossPayeeFinancialUkData = (isAppointed: string, lossPayeeData: ApplicationNominatedLossPayee) => {
  const {
    financialUk: { id, ...financialUkFields },
  } = lossPayeeData;

  const hasFinancialDataUk = objectHasKeysAndValues(financialUkFields);

  if (isAppointed === 'false' && hasFinancialDataUk) {
    return true;
  }

  return false;
};

export default shouldNullifyLossPayeeFinancialUkData;
