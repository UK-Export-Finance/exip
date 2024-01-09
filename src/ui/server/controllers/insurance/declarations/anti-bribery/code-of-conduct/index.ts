import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import save from '../../save-data';
import { Request, Response } from '../../../../../../types';

export const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT, CODE_OF_CONDUCT_SAVE_AND_BACK },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_CODE_OF_CONDUCT;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { CODE_OF_CONDUCT },
  },
} = TEMPLATES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    ID: FIELD_ID,
    ...DECLARATIONS_FIELDS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT_SAVE_AND_BACK}`,
});

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
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Anti-bribery - Code of conduct page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
    applicationAnswer: application.declaration[FIELD_ID],
  });
};

/**
 * post
 * Check Declarations - Anti-bribery - Code of conduct validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const payload = constructPayload(req.body, [FIELD_ID]);

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
      ...pageVariables(refNumber),
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
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`);
  } catch (err) {
    console.error('Error updating application - declarations - anti-bribery - exporting with code of conduct %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
