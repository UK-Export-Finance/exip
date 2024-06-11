import getKeystoneContext from './get-keystone-context';
import getPopulatedApplication from '../helpers/get-populated-application';
import createFullApplication from './create-full-application';
import mapApplicationIds from './map-application-ids';

/**
 * generateSubmittedApplication
 * 1) Create an application.
 * 2) Populate the application.
 * 3) Create and return an object with submitted date
 * @returns {Object} Submitted application
 */
export const generateSubmittedApplication = async () => {
  const context = getKeystoneContext();
  const fullApplication = await createFullApplication(context);

  const application = mapApplicationIds(fullApplication);

  const populatedApplication = await getPopulatedApplication({ context, application });

  const submittedApplication = {
    ...populatedApplication,
    submissionDate: new Date(),
  };

  return submittedApplication;
};

export default generateSubmittedApplication;
