import { RequestSessionUser, Application } from '../../../types';
import { objectHasKeysAndValues } from '../object';

/**
 * getFromSessionOrApplication
 * checks if application contains data for certain section and if it does, then returns that section and field
 * if application does not contain relevant data, returns session
 * @param {Application} application
 * @param {String} section in application - eg. business
 * @param {String} field eg. businessContactDetails
 * @param {RequestSessionUser} session
 * @returns {Object} session or application section
 */
const getFromSessionOrApplication = (application: Application, section: string, field: string, session?: RequestSessionUser) => {
  if (!application[section] || !application[section][field]) {
    return session;
  }

  const { id, __typename, ...sectionObject } = application[section][field];

  if (objectHasKeysAndValues(sectionObject)) {
    return application[section][field];
  }

  return session;
};

export default getFromSessionOrApplication;
