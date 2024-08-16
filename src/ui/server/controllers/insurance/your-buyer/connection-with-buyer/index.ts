import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/buyer-relationship';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { TRADED_WITH_BUYER, CONNECTION_WITH_BUYER_SAVE_AND_BACK: SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_PARTIALS },
    },
  },
} = TEMPLATES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

export const FIELD_IDS = [CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION];

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: CONNECTION_WITH_BUYER,
  FIELDS: {
    CONNECTION_WITH_BUYER: {
      ID: CONNECTION_WITH_BUYER,
      ...FIELDS[CONNECTION_WITH_BUYER],
    },
    CONNECTION_WITH_BUYER_DESCRIPTION: {
      ID: CONNECTION_WITH_BUYER_DESCRIPTION,
      ...FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION],
      MAXIMUM: 1000,
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
  HINT_HTML: TEMPLATES.PARTIALS.INSURANCE.BUYER.CONNECTION_WITH_BUYER.HINT_HTML,
  CONDITIONAL_YES_HTML: CONNECTION_WITH_BUYER_PARTIALS.CONDITIONAL_YES_HTML,
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

/**
 * get
 * Render the connection to the buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Connection to the buyer page
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
      applicationAnswer: application.buyer.relationship[CONNECTION_WITH_BUYER],
    });
  } catch (error) {
    console.error('Error getting connection to the buyer %O', error);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check connection to the buyer validation errors and if successful, redirect to the next part of the flow.
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
      });
    }

    const saveResponse = await mapAndSave.buyerRelationship(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If is a change route
     * redirect to CHECK_YOUR_ANSWERS
     */
    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    /**
     * If is a check-and-change route
     * redirect to CHECK_AND_CHANGE_ROUTE
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`);
  } catch (error) {
    console.error('Error posting connection to the buyer %O', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
