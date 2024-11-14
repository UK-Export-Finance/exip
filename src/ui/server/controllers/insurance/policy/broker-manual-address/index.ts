import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/policy';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

export const FIELD_ID = FULL_ADDRESS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @returns {Object} Page variables
 */
export const pageVariables = () => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.BROKER_MANUAL_ADDRESS[FIELD_ID],
  },
  SAVE_AND_BACK_URL: '#',
});

/**
 * Render the Broker manual address page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Broker manual address page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(),
      userName: getUserNameFromSession(req.session.user),
      application,
    });
  } catch (error) {
    console.error('Error getting broker manual address %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
