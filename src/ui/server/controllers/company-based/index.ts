import { PAGES } from '../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../constants';
import singleInputPageVariables from '../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import isChangeRoute from '../../helpers/is-change-route';
import { Request, Response } from '../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.VALID_COMPANY_BASE,
  PAGE_CONTENT_STRINGS: PAGES.COMPANY_BASED_PAGE,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.COMPANY_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.COMPANY_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(req.body, req.session.submittedData);

  const answer = req.body[FIELD_IDS.VALID_COMPANY_BASE];

  if (answer === 'false') {
    req.flash('previousRoute', ROUTES.COMPANY_BASED);

    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
