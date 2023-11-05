import { Account, ApplicationOwner } from '../../types';

/**
 * getFullNameString
 * Combine firstName and lastName
 * @param {Object} Account
 * @returns {String} Full name
 */
const getFullNameString = (account: Account | ApplicationOwner) => {
  const { firstName, lastName } = account;

  const fullName = `${firstName} ${lastName}`;

  return fullName;
};

export default getFullNameString;
