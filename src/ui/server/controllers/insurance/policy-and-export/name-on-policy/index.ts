import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_AND_EXPORTS_FIELD_IDS from '../../../../constants/field-ids/insurance/policy-and-exports';
import { PAGES } from '../../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { NAME_ON_POLICY_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const {
  NAME_ON_POLICY: { NAME, POSITION },
} = POLICY_AND_EXPORTS_FIELD_IDS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME_ON_POLICY: {
      ID: NAME,
      ...FIELDS.NAME_ON_POLICY,
    },
    POSITION: {
      ID: POSITION,
      ...FIELDS.NAME_ON_POLICY[POSITION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.NAME_ON_POLICY;

export const FIELD_IDS = [NAME, POSITION];

/**
 * get
 * Get the application and render the Name on policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Name on policy page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.NAME_ON_POLICY,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application,
  });
};

/**
 * post
 * Check Name on policy validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    try {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application,
        submittedValues: payload,
        validationErrors,
      });
    } catch (err) {
      console.error('Error rendering Name on policy page %O', err);

      return res.redirect(PROBLEM_WITH_SERVICE);
    }
  }

  try {
    // // save the application
    // const saveResponse = await mapAndSave.policy(req.body, application);
    // if (!saveResponse) {
    //   return res.redirect(PROBLEM_WITH_SERVICE);
    // }
    // if (isCheckAndChangeRoute(req.originalUrl)) {
    //   return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    // }
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - policy and exports - name on policy %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
