import { PAGES, UK_GOODS_AND_SERVICES_DESCRIPTION, ERROR_MESSAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const FIELD_ID = FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.UK_GOODS_OR_SERVICES,
    ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
    UK_GOODS_AND_SERVICES_DESCRIPTION,
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.UK_GOODS_OR_SERVICES, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATES.QUOTE.UK_GOODS_OR_SERVICES, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  const redirectToExitPage = answer === 'false';

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.QUOTE.CANNOT_APPLY);
  }

  req.session.submittedData.quoteEligibility = updateSubmittedData(req.body, req.session.submittedData.quoteEligibility);

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.POLICY_TYPE);
};

export { PAGE_VARIABLES, get, post };
