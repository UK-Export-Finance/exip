import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIDENTIALITY_SAVE_AND_BACK,
    ANTI_BRIBERY: { ROOT: ANTI_BRIBERY_ROOT },
  },
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
    ...FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.CONFIDENTIALITY;

const [CONFIDENTIALITY_CONTENT] = PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY.VERSIONS;

/**
 * get
 * Render the Declarations - Confidentiality page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Confidentiality page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    CONFIDENTIALITY_CONTENT,
    application: mapApplicationToFormFields(res.locals.application),
  });
};

/**
 * post
 * Check Declarations - Confidentiality validation errors and if successful, redirect to the next part of the flow.
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
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      CONFIDENTIALITY_CONTENT,
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ANTI_BRIBERY_ROOT}`);
  } catch (err) {
    console.error('Error updating application - declarations - confidentiality %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
