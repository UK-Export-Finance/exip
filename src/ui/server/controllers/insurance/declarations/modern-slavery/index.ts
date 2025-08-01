import { DECLARATIONS, TEMPLATES, ROUTES } from '../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import { PAGES } from '../../../../content-strings';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import save from '../map-and-save/modern-slavery';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Request, ResponseInsurance } from '../../../../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY, CONDITIONAL_REASONS } =
  DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const { MODERN_SLAVERY } = DECLARATIONS.LATEST_DECLARATIONS;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS, MODERN_SLAVERY_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: {
      ID: WILL_ADHERE_TO_ALL_REQUIREMENTS,
      ...MODERN_SLAVERY.WILL_ADHERE_TO_ALL_REQUIREMENTS,
      CONDITIONAL_REASON: {
        ID: CONDITIONAL_REASONS.CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
        ...MODERN_SLAVERY.WILL_ADHERE_TO_ALL_REQUIREMENTS.CONDITIONAL_REASON,
      },
    },
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: {
      ID: HAS_NO_OFFENSES_OR_INVESTIGATIONS,
      ...MODERN_SLAVERY.HAS_NO_OFFENSES_OR_INVESTIGATIONS,
      CONDITIONAL_REASON: {
        ID: CONDITIONAL_REASONS.OFFENSES_OR_INVESTIGATIONS,
        ...MODERN_SLAVERY.HAS_NO_OFFENSES_OR_INVESTIGATIONS.CONDITIONAL_REASON,
      },
    },
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: {
      ID: IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      ...MODERN_SLAVERY.IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      CONDITIONAL_REASON: {
        ID: CONDITIONAL_REASONS.AWARE_OF_EXISTING_SLAVERY,
        ...MODERN_SLAVERY.IS_NOT_AWARE_OF_EXISTING_SLAVERY.CONDITIONAL_REASON,
      },
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY_SAVE_AND_BACK}`,
});

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY,
  EXPANDABLE: PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY.EXPANDABLE.VERSIONS[0],
};

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
};

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

export const FIELD_IDS = [
  WILL_ADHERE_TO_ALL_REQUIREMENTS,
  HAS_NO_OFFENSES_OR_INVESTIGATIONS,
  IS_NOT_AWARE_OF_EXISTING_SLAVERY,
  CONDITIONAL_REASONS.CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
  CONDITIONAL_REASONS.OFFENSES_OR_INVESTIGATIONS,
  CONDITIONAL_REASONS.AWARE_OF_EXISTING_SLAVERY,
];

/**
 * get
 * Render the Declarations - Modern slavery page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Declarations - Modern slavery page
 */
export const get = (req: Request, res: ResponseInsurance) => {
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
    application: mapApplicationToFormFields(res.locals.application),
  });
};

/**
 * post
 * Check Declarations - Modern slavery validation errors and if successful, redirect to the next part of the flow.
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

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
      submittedValues: sanitiseData(payload),
    });
  }

  try {
    // save the application
    const saveResponse = await save.declarationModernSlavery(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`);
  } catch (error) {
    console.error('Error updating application - declarations - modern slavery %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
