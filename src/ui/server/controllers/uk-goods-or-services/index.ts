import { PAGES } from '../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../constants';
import singleInputPageVariables from '../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import isChangeRoute from '../../helpers/is-change-route';
import { Request, Response } from '../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  PAGE_CONTENT_STRINGS: PAGES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_PAGE,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  const redirectToExitPage = (answer === 'false');

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
    const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

    req.flash('exitReason', REASON.NOT_ENOUGH_HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.CANNOT_OBTAIN_COVER);
  }

  req.session.submittedData = updateSubmittedData(
    req.body,
    req.session.submittedData,
  );

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.POLICY_TYPE);
};

export {
  PAGE_VARIABLES,
  get,
  post,
};
