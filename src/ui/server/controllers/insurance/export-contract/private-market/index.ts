import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES, PAGES, PRIVATE_MARKET_WHY_DESCRIPTION } from '../../../../content-strings';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/private-market';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    DECLINED_BY_PRIVATE_MARKET,
    DECLINED_BY_PRIVATE_MARKET_CHANGE,
    DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
    PRIVATE_MARKET_SAVE_AND_BACK,
    AGENT,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  PARTIALS: {
    INSURANCE: { EXPORT_CONTRACT },
  },
} = TEMPLATES;

export const FIELD_ID = ATTEMPTED;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET,
  PRIVATE_MARKET_WHY_DESCRIPTION,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CUSTOM_CONTENT_HTML: EXPORT_CONTRACT.PRIVATE_MARKET.CUSTOM_CONTENT_HTML,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_SAVE_AND_BACK}`,
});

/**
 * get
 * Get the application and render the "Private market" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Private market" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
    applicationAnswer: application.exportContract.privateMarket[FIELD_ID],
  });
};

/**
 * post
 * Check for validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.privateMarket(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const attemptedPrivateMarketCover = payload[FIELD_ID] === 'true';

    const hasDeclinedDescription = application.exportContract.privateMarket[DECLINED_DESCRIPTION];

    /**
     * If the route is a "change" route,
     * the exporter has ATTEMPTED (private market cover),
     * and no DECLINED_DESCRIPTION has been submitted,
     * redirect to DECLINED_BY_PRIVATE_MARKET form.
     * Otherwise, redirect to CHECK_YOUR_ANSWERS.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (attemptedPrivateMarketCover && !hasDeclinedDescription) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * If the URL is a "check and change" route
       * the exporter has ATTEMPTED (private market cover),
       * and no DECLINED_DESCRIPTION has been submitted,
       * redirect to PRIVATE_MARKET with /check-and-change in URL.
       * This ensures that the next page can consume /check-and-change in the URL
       * and therefore correctly redirect on submission.
       * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE.
       */

      if (attemptedPrivateMarketCover && !hasDeclinedDescription) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * If the URL is a "check and change" route,
     * the exporter has ATTEMPTED (private market cover),
     * and no DECLINED_DESCRIPTION has been submitted,
     * redirect to DECLINED_BY_PRIVATE_MARKET with /check-and-change in URL.
     * This ensures that the next page can consume /check-and-change in the URL
     * and therefore correctly redirect on submission.
     * Otherwise, redirect to CHECK_AND_CHANGE_ROUTE.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (attemptedPrivateMarketCover && !hasDeclinedDescription) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    /**
     * If the exporter has ATTEMPTED (private market cover),
     * redirect to DECLINED_BY_PRIVATE_MARKET form.
     * otherwise, redirect to the next part of the flow.
     */
    if (attemptedPrivateMarketCover) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${AGENT}`);
  } catch (err) {
    console.error('Error updating application - export contract - private market %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
