import { PAGES, UK_GOODS_AND_SERVICES_DESCRIPTION, ERROR_MESSAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import isChangeRoute from '../../../helpers/is-change-route';
import { Request, Response } from '../../../../types';

const {
  SHARED_PAGES,
  PARTIALS: {
    QUOTE: { UK_GOODS_OR_SERVICES },
  },
} = TEMPLATES;

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.UK_GOODS_OR_SERVICES,
    ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
    UK_GOODS_AND_SERVICES_DESCRIPTION,
  },
};

export const HTML_FLAGS = {
  CUSTOM_CONTENT_HTML: UK_GOODS_OR_SERVICES.CUSTOM_CONTENT_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    userName: getUserNameFromSession(req.session.user),
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      ORIGINAL_URL: req.originalUrl,
      HTML_FLAGS,
    }),
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData.quoteEligibility,
  });

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      userName: getUserNameFromSession(req.session.user),
      ...singleInputPageVariables({ ...PAGE_VARIABLES, ORIGINAL_URL: req.originalUrl, HTML_FLAGS }),
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const answer = payload[FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  const redirectToExitPage = answer === 'false';

  if (redirectToExitPage) {
    req.flash('previousRoute', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);

    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.QUOTE.CANNOT_APPLY);
  }

  req.session.submittedData.quoteEligibility = updateSubmittedData(payload, req.session.submittedData.quoteEligibility);

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.POLICY_TYPE);
};
