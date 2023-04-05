import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import save from '../../save-data';
import { Request, Response } from '../../../../../../types';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.WILL_EXPORT_WITH_CODE_OF_CONDUCT;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
} = INSURANCE;

const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...DECLARATIONS_FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT;

/**
 * get
 * Render the Declarations - Anti-bribery - Exporting with code of conduct page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Anti-bribery - Exporting with code of conduct page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
    ...pageVariables(refNumber),
    user: req.session.user,
    application: res.locals.application,
  });
};

/**
 * post
 * Check Declarations - Anti-bribery - Exporting with code of conduct validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(refNumber),
      user: req.session.user,
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, req.body);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`);
  } catch (err) {
    console.error('Error updating application - declarations - anti-bribery - exporting with code of conduct ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
