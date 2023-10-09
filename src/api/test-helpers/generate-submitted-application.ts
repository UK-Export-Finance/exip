import getKeystoneContext from './get-keystone-context';
import getPopulatedApplication from '../helpers/get-populated-application';
import createFullApplication from './create-full-application';
import mapApplicationIds from './map-application-ids';

/**
 * generateSubmittedApplication
 * 1) Create an application.
 * 2) Populate the application.
 * 3) Create an object with submitted date
 * @param {Object} Context
 * @returns {Object} Submitted application
 */
export const generateSubmittedApplication = async () => {
  const context = getKeystoneContext();
  const application = await createFullApplication(context);

  const applicationIds = mapApplicationIds(application);
  const populatedApplication = await getPopulatedApplication(context, applicationIds);

  const submittedApplication = {
    ...populatedApplication,
    submissionDate: new Date(),
  };

  return submittedApplication;
};

export default generateSubmittedApplication;
