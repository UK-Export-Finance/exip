import flattenApplicationData from '../flatten-application-data';
import requiredFields from '../required-fields/prepare-application';
import sectionStatus from '../section-status';
import { TASKS } from '../../content-strings';
import { Application } from '../../../types';

/**
 * canAccessSubmitYourApplicationRoutes
 * Check if an application has submitted previous fields/sections required before accessing the "submit your application" group/sections/routes.
 * The "submit your application" group includes all routes for "check your answers" and "declarations".
 * @param {Application}
 * @param {String} Current URL
 * @returns {Boolean}
 */
const canAccessSubmitYourApplicationRoutes = (application: Application) => {
  const flatApplicationData = flattenApplicationData(application);

  const fields = requiredFields(flatApplicationData);

  const status = sectionStatus(fields, application);

  if (status !== TASKS.STATUS.COMPLETED) {
    return false;
  }

  return true;
};

export default canAccessSubmitYourApplicationRoutes;
