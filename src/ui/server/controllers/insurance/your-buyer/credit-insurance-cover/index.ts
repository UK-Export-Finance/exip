import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/buyer-relationship';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, BUYER_FINANCIAL_INFORMATION },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BUYER },
  },
} = TEMPLATES;

export const FIELD_ID = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

export const FIELD_IDS = [FIELD_ID, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CREDIT_INSURANCE_COVER;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FIELDS: {
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
      ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
      ...FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    },
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
      ID: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
      ...FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CONDITIONAL_YES_HTML: BUYER.CREDIT_INSURANCE_COVER.CONDITIONAL_YES_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the Buyer - Credit insurance cover page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Buyer - Credit insurance cover page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
      HTML_FLAGS,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    applicationAnswer: application.buyer.relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
  });
};

/**
 * post
 * Check credit insurance cover validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: sanitiseData(payload),
        validationErrors,
      });
    }

    const saveResponse = await mapAndSave.buyerRelationship(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a change route
     * redirect to TRADING_HISTORY_CHANGE
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If is a check-and-change route
     * redirect to TRADING_HISTORY_CHECK_AND_CHANGE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`);
  } catch (err) {
    console.error('Error posting alternative currency %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
