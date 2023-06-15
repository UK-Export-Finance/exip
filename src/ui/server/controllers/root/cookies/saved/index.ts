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

export const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.COOKIES_SAVED_PAGE,
};

export const TEMPLATE = TEMPLATES.COOKIES_SAVED;

export const get = (req: Request, res: Response) => {
  let RETURN_TO_SERVICE_URL;

  if (req.session.returnToServiceUrl) {
    const url = req.session.returnToServiceUrl;

    RETURN_TO_SERVICE_URL = url;
  } else {
    RETURN_TO_SERVICE_URL = SIGN_IN_ROOT;
  }

  delete req.session.returnToServiceUrl;

  return res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    RETURN_TO_SERVICE_URL,
  });
};
