import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { ApplicationNominatedLossPayee } from '../../../../../../types';

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK, LOCATION },
} = FIELD_IDS;

const CONTENT_STRINGS = POLICY_FIELDS.LOSS_PAYEE_DETAILS[LOCATION].OPTIONS;

/**
 * mapLossPayeeLocation
 * Map an application's loss payee location
 * @param {ApplicationNominatedLossPayee} lossPayee
 * @returns {String}
 */
const mapLossPayeeLocation = (lossPayee: ApplicationNominatedLossPayee) => {
  if (lossPayee[IS_LOCATED_INTERNATIONALLY]) {
    return String(CONTENT_STRINGS?.INTERNATIONALLY.TEXT);
  }

  if (lossPayee[IS_LOCATED_IN_UK]) {
    return String(CONTENT_STRINGS?.UK.TEXT);
  }
};

export default mapLossPayeeLocation;
