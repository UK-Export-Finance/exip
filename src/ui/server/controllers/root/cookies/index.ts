import { ERROR_MESSAGES, FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES, COOKIE } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import constructPayload from '../../../helpers/construct-payload';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import isInsuranceRoute from '../../../helpers/is-insurance-route';
import { Request, Response } from '../../../../types';

export const FIELD_ID = FIELD_IDS.OPTIONAL_COOKIES;

const { COOKIES_SAVED, INSURANCE } = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields and content
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
};

export const TEMPLATE = TEMPLATES.COOKIES;

/**
 * get
 * Render the Cookies page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Cookies page
 */
export const get = (req: Request, res: Response) => {
  /**
   * Add the previous URL to the session.
   * This is required for consumption in the "cookies saved" page,
   * so that we can render a button with the original URL the user was on,
   * prior to visiting the cookies page and changing answers.
   */
  if (req.headers.referer) {
    req.session.returnToServiceUrl = req.headers.referer;
  }

  return res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
    submittedValue: req.cookies.optionalCookies ?? req.cookies[COOKIE.NAME.OPTION],
  });
};

/**
 * post
 * Check the cookies page for validation errors and if successful, redirect to the cookies saved page.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Cookies page with validation errors or the Cookies saved page
 */
export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      userName: getUserNameFromSession(req.session.user),
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
      FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
      validationErrors,
    });
  }

  if (isInsuranceRoute(req.originalUrl)) {
    return res.redirect(INSURANCE.COOKIES_SAVED);
  }

  return res.redirect(COOKIES_SAVED);
};
