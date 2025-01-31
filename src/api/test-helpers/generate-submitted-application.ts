import getKeystoneContext from './get-keystone-context';
import getPopulatedApplication from '../helpers/get-populated-application';
import createFullApplication from './create-full-application';

/**
 * generateSubmittedApplication
 * 1) Create a full application.
 * 2) Populate the application.
 * 3) Create and return an object with submitted date
 * @returns {Object} Submitted application
 */
export const generateSubmittedApplication = async () => {
  try {
    console.info('Generating a submitted application (test helpers)');

    const context = getKeystoneContext();
    const fullApplication = await createFullApplication(context);

    const populatedApplication = await getPopulatedApplication.get({ context, application: fullApplication });

    const submittedApplication = {
      ...populatedApplication,
      submissionDate: new Date(),
    };

    return submittedApplication;
  } catch (error) {
    console.error('Error generating a submitted application (test helpers) %o', error);

    throw new Error('Error generating a submitted application (test helpers) %o', error);
  }
};

export default generateSubmittedApplication;
