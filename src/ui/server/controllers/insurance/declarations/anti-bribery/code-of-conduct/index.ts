import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES, DECLARATIONS } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import save from '../../save-data';
import { Request, ResponseInsurance } from '../../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT, CODE_OF_CONDUCT_SAVE_AND_BACK },
    MODERN_SLAVERY,
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { ANTI_BRIBERY_CODE_OF_CONDUCT } = DECLARATIONS.LATEST_DECLARATIONS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { CODE_OF_CONDUCT },
  },
} = TEMPLATES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    ID: FIELD_ID,
    ...ANTI_BRIBERY_CODE_OF_CONDUCT,
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CONDITIONAL_YES_HTML: CODE_OF_CONDUCT.CONDITIONAL_YES_HTML,
  HINT_HTML: CODE_OF_CONDUCT.HINT_HTML,
  HORIZONTAL_RADIOS: true,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the Declarations - Anti-bribery - Code of conduct page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Declarations - Anti-bribery - Code of conduct page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS: ANTI_BRIBERY_CODE_OF_CONDUCT, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
    applicationAnswer: application.declaration[FIELD_ID],
  });
};

/**
 * post
 * Check Declarations - Anti-bribery - Code of conduct validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS: ANTI_BRIBERY_CODE_OF_CONDUCT, BACK_LINK: req.headers.referer, HTML_FLAGS }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  try {
    // save the application
    const saveResponse = await save.declaration(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answer = sanitiseValue({ key: FIELD_ID, value: payload[FIELD_ID] });

    // answer is true
    if (answer) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`);
    }

    // answer is false
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`);
  } catch (error) {
    console.error('Error updating application - declarations - anti-bribery - exporting with code of conduct %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
