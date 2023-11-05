import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import corePageVariables from '../../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

/**
 * PAGE_VARIABLES
 * Page content
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.COOKIES_SAVED_PAGE,
};

export const TEMPLATE = TEMPLATES.COOKIES_SAVED;

/**
 * get
 * Render the Cookies saved page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Cookies saved page
 */
export const get = (req: Request, res: Response) => {
  let RETURN_TO_SERVICE_URL;

  /**
   * If we have a returnToServiceUrl in the session,
   * Use this to render a link to the original URL a user was on,
   * prior to visiting the cookies page and changing answers.
   */
  if (req.session.returnToServiceUrl) {
    const url = req.session.returnToServiceUrl;

    RETURN_TO_SERVICE_URL = url;
  } else {
    RETURN_TO_SERVICE_URL = SIGN_IN_ROOT;
  }

  /**
   * No need to keep returnToServiceUrl in the session after consumption,
   * it can be safely deleted.
   */
  delete req.session.returnToServiceUrl;

  return res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    RETURN_TO_SERVICE_URL,
  });
};
