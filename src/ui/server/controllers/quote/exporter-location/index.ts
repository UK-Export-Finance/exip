import { ERROR_MESSAGES, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      ORIGINAL_URL: req.originalUrl,
    }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.quoteEligibility,
  });

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        ORIGINAL_URL: req.originalUrl,
      }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  req.session.submittedData = {
    quoteEligibility: updateSubmittedData(payload, req.session.submittedData.quoteEligibility),
    insuranceEligibility: {},
  };

  const answer = payload[FIELD_ID];

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
