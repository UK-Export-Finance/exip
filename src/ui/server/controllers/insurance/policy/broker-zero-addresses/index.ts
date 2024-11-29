import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

/**
 * Render the Broker - zero addresses found page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Broker - zero addresses found page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    // TODO: EMS-3974 - this will come from the following:
    // application.broker.postcode

    const mockPostcode = 'W1A 1AA';

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      postcode: mockPostcode,
    });
  } catch (error) {
    console.error('Error getting broker zero addresses %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
