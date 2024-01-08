import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT;

const {
  ACCOUNT: { SIGN_IN, CREATE },
} = ROUTES.INSURANCE;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT,
  HAS_SAVE_AND_BACK: false,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the Do you have an account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Do you have an account page
 */
export const get = (req: Request, res: Response) => res.render(TEMPLATE, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

/**
 * post
 * Check Do you have an account validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = payload[FIELD_ID];

  if (answer === 'true') {
    return res.redirect(SIGN_IN.ROOT);
  }

  return res.redirect(CREATE.YOUR_DETAILS);
};
