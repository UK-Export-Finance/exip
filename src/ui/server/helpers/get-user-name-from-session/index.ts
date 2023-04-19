import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { RequestSessionUser } from '../../../types';

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

/**
 * getUserNameFromSession
 * Get a user's full name from session
 * @param {Object} User session
 * @returns {String} Full user name
 */
const getUserNameFromSession = (userSession?: RequestSessionUser) => {
  if (userSession) {
    return `${userSession[FIRST_NAME]} ${userSession[LAST_NAME]}`;
  }

  return null;
};

export default getUserNameFromSession;
