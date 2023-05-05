import flattenApplicationData from '../flatten-application-data';
import requiredFields from '../required-fields/section-review';
import sectionStatus from '../section-status';
import { TASKS } from '../../content-strings';
import { Application } from '../../../types';

/**
 * canAccessCheckYourAnswersRoutes
 * Check if an application has submitted previous fields/sections required before accessing the "check your answers" section/routes.
 * @param {Object} Application
 * @param {String} Current URL
 * @returns {Boolean}
 */
const canAccessCheckYourAnswersRoutes = (application: Application) => {
  const flatApplicationData = flattenApplicationData(application);

  const fields = requiredFields(flatApplicationData);

  const status = sectionStatus(fields, application);

  if (status !== TASKS.STATUS.COMPLETED) {
    return false;
  }

  return true;
};

export default canAccessCheckYourAnswersRoutes;
