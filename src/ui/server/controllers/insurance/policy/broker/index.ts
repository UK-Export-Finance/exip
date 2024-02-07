import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/broker';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const { USING_BROKER } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, BROKER_DETAILS_ROOT },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BROKER: BROKER_PARTIALS },
  },
  ATTRIBUTES: { CLASSES },
} = TEMPLATES;

export const FIELD_ID = USING_BROKER;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER;

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
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
  LEGEND_CLASS: CLASSES.LEGEND.XL,
};

/**
 * Render the Broker page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders check your answers page with previously submitted details
 */
export const get = (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.error('Error getting broker %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts broker page
 * runs validation and either renders template with errors or redirects to next page
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

    const { referenceNumber } = req.params;

    const payload = constructPayload(req.body, [FIELD_ID]);

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

    // if any errors then render template with errors
    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.broker(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answer = payload[FIELD_ID];

    if (answer === 'true') {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - your business - broker %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
