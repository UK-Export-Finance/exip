import { PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../shared-validation/exporter-location';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.VALID_EXPORTER_LOCATION,
  PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  req.session.submittedData = updateSubmittedData(req.body, req.session.submittedData);

  const answer = req.body[FIELD_IDS.VALID_EXPORTER_LOCATION];

  if (answer === 'false') {
    req.flash('previousRoute', ROUTES.QUOTE.EXPORTER_LOCATION);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
