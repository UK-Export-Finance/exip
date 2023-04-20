import { Context, Application } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { APPLICATION } from '../../constants';
import getPopulatedApplication from '../../helpers/get-populated-application';
import applicationSubmittedEmails from '../../emails/send-application-submitted-emails';
import generate from '../../generate-csv';
import { SubmitApplicationVariables, SuccessResponse } from '../../types';

/**
 * submitApplication
 * Submit an application
 * 1) Change application status, add submission date
 * 2) Generate a CSV for the UKEF underwriting team
 * 3) Sends emails to the exporter and UKEF underwriting team
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SubmitApplication mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const submitApplication = async (root: any, variables: SubmitApplicationVariables, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Submitting application');

    // get the application
    const application = (await context.db.Application.findOne({
      where: { id: variables.applicationId },
    })) as Application;

    if (application) {
      const hasDraftStatus = application.status === APPLICATION.STATUS.DRAFT;

      const now = new Date();

      // check the current date vs submission deadline
      const validSubmissionDate = isAfter(new Date(application.submissionDeadline), now);

      const canSubmit = hasDraftStatus && validSubmissionDate;

      if (canSubmit) {
        // change the status and add submission date
        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.DRAFT,
          submissionDate: now,
        };

        const updatedApplication = await context.db.Application.updateOne({
          where: { id: application.id },
          data: update,
        });

        // get a fully populated application for CSV generation
        const populatedApplication = await getPopulatedApplication(context, updatedApplication);

        // generate a CSV for UKEF underwriting team email
        const csvPath = await generate.csv(populatedApplication);

        // send all "application submitted" emails
        await applicationSubmittedEmails.send(populatedApplication, csvPath);

        return {
          success: true,
        };
      }

      console.error('Unable to submit application - application already submitted');
    }

    console.error('Unable to submit application - no application found');

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Submitting application ${err}`);
  }
};

export default submitApplication;
