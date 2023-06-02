import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import replaceCharacterCodesWithCharacters from '../replace-character-codes-with-characters';
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
    const firstName = replaceCharacterCodesWithCharacters(userSession[FIRST_NAME]);
    const lastName = replaceCharacterCodesWithCharacters(userSession[LAST_NAME]);

    return `${firstName} ${lastName}`;
  }

  return null;
};

export default getUserNameFromSession;
