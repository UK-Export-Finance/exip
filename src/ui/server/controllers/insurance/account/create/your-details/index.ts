import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import saveData from './save-data';
import { Request, Response } from '../../../../../../types';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
      SIGN_IN,
    },
  },
} = ROUTES;

/**
 * PAGE_VARIABLES
 * Page fields
 * @returns {Object} Page variables
 */
export const PAGE_VARIABLES = {
  FIELDS: {
    FIRST_NAME: {
      ID: FIRST_NAME,
      ...FIELDS.CREATE.YOUR_DETAILS[FIRST_NAME],
    },
    LAST_NAME: {
      ID: LAST_NAME,
      ...FIELDS.CREATE.YOUR_DETAILS[LAST_NAME],
    },
    EMAIL: {
      ID: EMAIL,
      ...FIELDS.CREATE.YOUR_DETAILS[EMAIL],
    },
    PASSWORD: {
      ID: PASSWORD,
      ...FIELDS.CREATE.YOUR_DETAILS[PASSWORD],
    },
  },
  SIGN_IN_LINK: SIGN_IN.ROOT,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

/**
 * get
 * Render the Do you already have an account page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Do you already have an account page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...PAGE_VARIABLES,
  });

/**
 * post
 * Check About goods or services validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      submittedValues: req.body,
      validationErrors,
    });
  }

  try {
    // save the account
    const saveResponse = await saveData.account(req.body);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    // store the submitted email in local session, for consumption in the next part of the flow.
    req.session.emailAddressToConfirm = req.body[EMAIL];

    return res.redirect(CONFIRM_EMAIL);
  } catch (err) {
    console.error('Error creating account', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
