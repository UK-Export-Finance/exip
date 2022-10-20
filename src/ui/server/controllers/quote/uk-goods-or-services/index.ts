import { PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../shared-validation/uk-goods-or-services';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.UK_GOODS_OR_SERVICES,
    ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.UK_GOODS_OR_SERVICES, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

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
    req.flash('previousRoute', ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.NOT_ENOUGH_HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  req.session.submittedData = updateSubmittedData(req.body, req.session.submittedData);

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.POLICY_TYPE);
};

export { PAGE_VARIABLES, get, post };
