import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import mapAndSave from '../map-and-save/buyer-relationship';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION_SAVE_AND_BACK: SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      BUYER: { BUYER_FINANCIAL_INFORMATION: BUYER_FINANCIAL_INFORMATION_PARTIAL },
    },
  },
} = TEMPLATES;

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = YOUR_BUYER_FIELD_IDS;

export const FIELD_IDS = [HAS_BUYER_FINANCIAL_ACCOUNTS];

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.BUYER_FINANCIAL_INFORMATION;

/**
 * pageVariables
 * returns pageVariables for buyer-financial information
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} pageVariables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: HAS_BUYER_FINANCIAL_ACCOUNTS,
  FIELDS: {
    HAS_BUYER_FINANCIAL_ACCOUNTS: {
      ID: HAS_BUYER_FINANCIAL_ACCOUNTS,
      HINT: PAGE_CONTENT_STRINGS.HINT,
    },
  },
  PAGE_CONTENT_STRINGS,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CUSTOM_CONTENT_HTML: BUYER_FINANCIAL_INFORMATION_PARTIAL.CUSTOM_CONTENT_HTML,
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

/**
 * get
 * Render the buyer financial information page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Buyer financial information page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
      applicationAnswer: application.buyer.relationship[HAS_BUYER_FINANCIAL_ACCOUNTS],
    });
  } catch (err) {
    console.error('Error getting buyer financial information page %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check buyer financial information validation errors and if successful, redirect to the next part of the flow.
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
        validationErrors,
        submittedValues: sanitiseData(payload),
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
      });
    }

    const saveResponse = await mapAndSave.buyerRelationship(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a check-and-change route
     * redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error posting buyer financial information %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
