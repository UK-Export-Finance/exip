import { DECLARATIONS, TEMPLATES, ROUTES } from '../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import { PAGES } from '../../../../content-strings';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const { MODERN_SLAVERY } = DECLARATIONS.LATEST_DECLARATIONS;

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: {
      ID: WILL_ADHERE_TO_ALL_REQUIREMENTS,
      ...MODERN_SLAVERY.WILL_ADHERE_TO_ALL_REQUIREMENTS,
    },
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: {
      ID: HAS_NO_OFFENSES_OR_INVESTIGATIONS,
      ...MODERN_SLAVERY.HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    },
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: {
      ID: IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      ...MODERN_SLAVERY.IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
};

export const TEMPLATE = TEMPLATES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

export const FIELD_IDS = [WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY];

/**
 * get
 * Render the Declarations - Modern slavery page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Declarations - Modern slavery page
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
  });
};
