import { PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.VALID_COMPANY_BASE,
  PAGE_CONTENT_STRINGS: PAGES.QUOTE.COMPANY_BASED,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.COMPANY_BASED, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.QUOTE.COMPANY_BASED, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(req.body, req.session.submittedData);

  const answer = req.body[FIELD_IDS.VALID_COMPANY_BASE];

  if (answer === 'false') {
    req.flash('previousRoute', ROUTES.QUOTE.COMPANY_BASED);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
