import { ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES, DECLARATIONS } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

const { ANTI_BRIBERY } = DECLARATIONS.LATEST_DECLARATIONS;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { ROOT_SAVE_AND_BACK: ANTI_BRIBERY_SAVE_AND_BACK, CODE_OF_CONDUCT },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...ANTI_BRIBERY,
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.ANTI_BRIBERY.ROOT;

/**
 * get
 * Render the Declarations - Anti-bribery page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Anti-bribery page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: ANTI_BRIBERY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
  });
};

/**
 * post
 * Check Declarations - Anti-bribery validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: ANTI_BRIBERY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT}`);
  } catch (error) {
    console.error('Error updating application - declarations - anti-bribery %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
