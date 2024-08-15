import { BUTTONS, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES, DECLARATIONS } from '../../../../constants';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import canSubmitApplication from '../../../../helpers/can-submit-application';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

const { CONFIRMATION_AND_ACKNOWLEDGEMENTS } = DECLARATIONS.LATEST_DECLARATIONS;

const {
  INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.DECLARATION;

/**
 * get
 * Render the Declarations - Confirmation and acknowledgements page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Confirmation and acknowledgements page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: CONFIRMATION_AND_ACKNOWLEDGEMENTS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
    SUBMIT_BUTTON_COPY: BUTTONS.SUBMIT_APPLICATION,
  });
};

/**
 * post
 * Check Declarations - Confirmation and acknowledgements validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const payload = constructPayload(req.body, [FIELD_ID]);

  const { referenceNumber } = application;

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CONFIRMATION_AND_ACKNOWLEDGEMENTS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
      SUBMIT_BUTTON_COPY: BUTTONS.SUBMIT_APPLICATION,
    });
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, req.body);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * Combine the latest application with the saved declaration answer.
     * Otherwise, we need to make another API call to get the latest full application.
     */
    const latestApplication = {
      ...application,
      declaration: {
        ...application.declaration,
        ...saveResponse,
      },
    };

    const canSubmit = canSubmitApplication(latestApplication);

    if (canSubmit) {
      // submit the application
      const submissionResponse = await api.keystone.application.submit(application.id);

      if (submissionResponse.success) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`);
      }
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (error) {
    console.error('Error updating application - declarations - confirmation and acknowledgements %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
