import { RequestSessionUser, Application } from '../../../types';
import { objectHasKeysAndValues } from '../object';

/**
 * getValuesFromUserSessionOrApplication
 * checks if application contains data for certain section and if it does, then returns that section and field
 * if application does not contain relevant data, returns session
 * @param {Application} application
 * @param {String} section in application - eg. business
 * @param {String} field eg. businessContactDetails
 * @param {RequestSessionUser} session
 * @returns {Object} session or application section
 */
const getValuesFromUserSessionOrApplication = (application: Application, section: string, field: string, userSession?: RequestSessionUser) => {
  if (!application[section] || !application[section][field]) {
    return userSession;
  }

  const { id, __typename, ...sectionObject } = application[section][field];

  if (objectHasKeysAndValues(sectionObject)) {
    return sectionObject;
  }

  return userSession;
};

export default getValuesFromUserSessionOrApplication;
