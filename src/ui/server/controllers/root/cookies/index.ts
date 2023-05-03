import { ERROR_MESSAGES, FIELDS, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../types';

const FIELD_ID = FIELD_IDS.OPTIONAL_COOKIES;

const startRoute = ROUTES.QUOTE.START;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
  PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
};

export const TEMPLATE = TEMPLATES.COOKIES;

export const get = (req: Request, res: Response) => {
  // store the previous URL so that we can use this in the POST res.render.
  req.flash('previousUrl', req.headers.referer);

  // TODO: Remove after debug
  // eslint-disable-next-line no-console
  console.log('cookies page', req.cookies);

  return res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
    FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
    submittedValue: req.cookies.optionalCookies,
  });
};

export const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID]);

  let backLink = req.headers.referer;

  if (validationErrors) {
    return res.render(TEMPLATE, {
      userName: getUserNameFromSession(req.session.user),
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
      FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const previousUrl = req.flash('previousUrl');

  const showSuccessMessageGoBackLink = previousUrl && previousUrl.length && !previousUrl.includes(ROUTES.COOKIES);

  if (previousUrl) {
    backLink = previousUrl[previousUrl.length - 1];
  }

  return res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: backLink, START_ROUTE: startRoute }),
    FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
    submittedValue: req.cookies.optionalCookies,
    showSuccessMessage: true,
    showSuccessMessageGoBackLink,
  });
};
