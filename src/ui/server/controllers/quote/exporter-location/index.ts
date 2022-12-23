import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const FIELD_ID = FIELD_IDS.VALID_EXPORTER_LOCATION;

const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION;

const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
    }),
    submittedValues: req.session.submittedData.quoteEligibility,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      validationErrors,
    });
  }

  req.session.submittedData = {
    quoteEligibility: updateSubmittedData(req.body, req.session.submittedData.quoteEligibility),
    insuranceEligibility: {},
  };

  const answer = req.body[FIELD_IDS.VALID_EXPORTER_LOCATION];

  if (answer === 'false') {
    req.flash('previousRoute', ROUTES.QUOTE.EXPORTER_LOCATION);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(ROUTES.QUOTE.CANNOT_APPLY);
  }

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
};

export { PAGE_VARIABLES, get, post };
