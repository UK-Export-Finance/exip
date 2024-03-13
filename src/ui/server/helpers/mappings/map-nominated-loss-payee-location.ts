import { ApplicationNominatedLossPayee } from '../../../types';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';

const { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

/**
 * mapNominatedLossPayeeLocation
 * maps location of nominatedLossPayee and returns string of IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK or undefined
 * @param {ApplicationNominatedLossPayee } Application nominatedLossPayee
 * @returns {String} IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK or undefined
 */
const mapNominatedLossPayeeLocation = (nominatedLossPayee: ApplicationNominatedLossPayee) => {
  let location;

  if (nominatedLossPayee?.[IS_LOCATED_INTERNATIONALLY] === true) {
    location = IS_LOCATED_INTERNATIONALLY;
  }

  if (nominatedLossPayee?.[IS_LOCATED_IN_UK] === true) {
    location = IS_LOCATED_IN_UK;
  }

  return location;
};

export default mapNominatedLossPayeeLocation;
