import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT;

const {
  ACCOUNT: { SIGN_IN, CREATE },
} = ROUTES.INSURANCE;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT;

/**
 * get
 * Render the Do you already have an account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Do you already have an account page
 */
export const get = (req: Request, res: Response) => res.render(TEMPLATE, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

/**
 * post
 * Check Do you already have an account validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      validationErrors,
    });
  }

  const answer = req.body[FIELD_ID];

  if (answer === 'true') {
    return res.redirect(SIGN_IN.ROOT);
  }

  return res.redirect(CREATE.YOUR_DETAILS);
};
