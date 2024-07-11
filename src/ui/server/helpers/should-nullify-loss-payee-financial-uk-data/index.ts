import { objectHasKeysAndValues } from '../object';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { ApplicationNominatedLossPayee } from '../../../types';

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY },
} = FIELD_IDS;

/**
 * shouldNullifyLossPayeeFinancialUkData
 * Check if we should nullify loss payee financial UK data.
 * If IS_APPOINTED is false
 * Or the location is IS_LOCATED_INTERNATIONALLY
 * and the application has some financial UK data,
 * the UK data should be nullified.
 * @param {String} isAppointed: Is appointed form field
 * @param {String} location: Loss payee location form field
 * @param {ApplicationNominatedLossPayee} lossPayeeData: Loss payee data
 * @returns {Boolean}
 */
const shouldNullifyLossPayeeFinancialUkData = (isAppointed: string, location: string, lossPayeeData: ApplicationNominatedLossPayee) => {
  const {
    financialUk: { id, ...financialUkFields },
  } = lossPayeeData;

  const hasData = objectHasKeysAndValues(financialUkFields);

  const isNotAppointed = isAppointed === 'false';

  const locatedInternationally = location === IS_LOCATED_INTERNATIONALLY;

  if ((isNotAppointed || locatedInternationally) && hasData) {
    return true;
  }

  return false;
};

export default shouldNullifyLossPayeeFinancialUkData;
