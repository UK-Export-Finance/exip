import { Context, Application } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { APPLICATION } from '../../../constants';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import applicationSubmittedEmails from '../../../emails/send-application-submitted-emails';
import generate from '../../../generate-xlsx';
import { SubmitApplicationVariables, SuccessResponse } from '../../../types';

/**
 * submitApplication
 * Submit an application
 * 1) Change application status, add submission date
 * 2) Generate a XLSX for the UKEF underwriting team
 * 3) Sends emails to the UKEF underwriting team and the account that created the application
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SubmitApplication mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const submitApplication = async (root: any, variables: SubmitApplicationVariables, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Submitting application %s', variables.applicationId);

    // get the application
    const application = (await context.db.Application.findOne({
      where: { id: variables.applicationId },
    })) as Application;

    if (application) {
      const { status, submissionDeadline, submissionCount } = application;

      const isInProgress = status === APPLICATION.STATUS.IN_PROGRESS;

      const now = new Date();

      // check the current date vs submission deadline
      const validSubmissionDate = isAfter(new Date(submissionDeadline), now);

      const isFirstSubmission = submissionCount === 0;

      const canSubmit = isInProgress && validSubmissionDate && isFirstSubmission;

      if (canSubmit) {
        // change the status and add submission date
        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.IN_PROGRESS,
          submissionDate: now,
          submissionCount: submissionCount + 1,
        };

        const updatedApplication = await context.db.Application.updateOne({
          where: { id: application.id },
          data: update,
        });

        // get a fully populated application for XLSX generation
        const populatedApplication = await getPopulatedApplication(context, updatedApplication);

        // generate a XLSX for UKEF underwriting team email
        const xlsxPath = await generate.XLSX(populatedApplication);

        // send all "application submitted" emails
        await applicationSubmittedEmails.send(populatedApplication, xlsxPath);

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
    console.error('Error submitting application %O', err);
    throw new Error(`Submitting application ${err}`);
  }
};

export default submitApplication;
