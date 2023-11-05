import * as dotenv from 'dotenv';
import { ROUTES } from '../../../../../constants';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

dotenv.config();

/**
 * req.headers.origin is not available in a GET request.
 * We therefore need to use req.headers.host
 * and prefix with the protocol (https://)
 */

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL_RESENT },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

/**
 * get
 * Send the "confirm email addres" email and redirect to "confirm email resent" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Confirm email resent page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const urlOrigin = `https://${req.headers.host}`;

    const sanitisedId = String(sanitiseValue({ value: id }));

    const response = await api.keystone.account.sendEmailConfirmEmailAddress(urlOrigin, sanitisedId);

    if (response.success) {
      return res.redirect(`${CONFIRM_EMAIL_RESENT}?id=${sanitisedId}`);
    }

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (err) {
    console.error("Error sending 'confirm email address' email %O", err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
