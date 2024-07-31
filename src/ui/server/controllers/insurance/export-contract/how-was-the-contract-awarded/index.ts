import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../constants/field-ids/insurance/export-contract';
import { PARTIALS as PARTIAL_TEMPLATES } from '../../../../constants/templates/partials';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { CONDITIONAL_OTHER_METHOD_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @returns {Object} Page variables
 */
export const pageVariables = () => ({
  FIELDS: {
    AWARD_METHOD: {
      ID: AWARD_METHOD,
      ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD],
    },
    OTHER_AWARD_METHOD: {
      ID: OTHER_AWARD_METHOD,
      ...FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[OTHER_AWARD_METHOD],
    },
  },
  SAVE_AND_BACK_URL: '#',
});

/**
 * get
 * Get the application and render the "How was the contract awarded" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "How was the contract awarded" page
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
    }),
    ...pageVariables(),
    CONDITIONAL_OTHER_METHOD_HTML,
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Redirect to the next part of the flow.
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

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`);
};
