import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const { SORT_CODE, ACCOUNT_NUMBER } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;
const { BANK_ADDRESS } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_FINANCIAL_UK, BANK_ADDRESS: BANK_ADDRESS_FIELD } = POLICY_FIELDS;

export const FIELD_IDS = [SORT_CODE, ACCOUNT_NUMBER, BANK_ADDRESS];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_UK;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_UK;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    SORT_CODE: {
      ID: SORT_CODE,
      ...LOSS_PAYEE_FINANCIAL_UK[SORT_CODE],
    },
    ACCOUNT_NUMBER: {
      ID: ACCOUNT_NUMBER,
      ...LOSS_PAYEE_FINANCIAL_UK[ACCOUNT_NUMBER],
    },
    BANK_ADDRESS: {
      ID: BANK_ADDRESS,
      ...BANK_ADDRESS_FIELD,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

/**
 * Render the Loss payee bank details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Loss payee bank details page
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
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Run validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  try {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - policy - loss payee bank details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
