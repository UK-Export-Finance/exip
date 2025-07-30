import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { ATTRIBUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/broker';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, ResponseInsurance } from '../../../../../types';

const { USING_BROKER } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_SAVE_AND_BACK, LOSS_PAYEE_ROOT, BROKER_DETAILS_ROOT, BROKER_DETAILS_CHANGE, BROKER_DETAILS_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BROKER: BROKER_PARTIALS },
  },
} = TEMPLATES;

export const FIELD_ID = USING_BROKER;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER;

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: USING_BROKER,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CUSTOM_CONTENT_HTML: BROKER_PARTIALS.CUSTOM_CONTENT_HTML,
  LEGEND_CLASS: ATTRIBUTES.CLASSES.LEGEND.XL,
};

/**
 * Render the Broker page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Broker page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
    applicationAnswer: application.broker[USING_BROKER],
    ...pageVariables(application.referenceNumber),
  });
};

/**
 * posts broker page
 * Run validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber),
      application: mapApplicationToFormFields(application),
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.broker(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const isUsingBroker = payload[FIELD_ID] === 'true';

    if (isChangeRoute(req.originalUrl)) {
      /**
       * If change route and "is using broker" answer is submitted,
       * redirect to broker details page with /change in URL.
       * This ensures that the next page can consume /change in the URL
       * and therefore correctly redirect on submission.
       */

      if (isUsingBroker) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      /**
       * If check-and-change route and "is using broker" answer is submitted,
       * redirect to different broker details page with /check-and-change in url.
       * This ensures that the next page can consume /check-and-change in the URL
       * and therefore correctly redirect on submission.
       */
      if (isUsingBroker) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_CHECK_AND_CHANGE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    if (isUsingBroker) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`);
  } catch (error) {
    console.error('Error updating application - policy - broker %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
