import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/broker';
import { Request, Response } from '../../../../../types';

const { NAME, EMAIL, FULL_ADDRESS } = POLICY_FIELD_IDS.BROKER_DETAILS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_CONFIRM_ADDRESS_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { BROKER_DETAILS } = POLICY_FIELDS;

export const FIELD_IDS = [NAME, EMAIL, FULL_ADDRESS];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_DETAILS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_DETAILS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME: {
      ID: NAME,
      ...BROKER_DETAILS[NAME],
    },
    EMAIL: {
      ID: EMAIL,
      ...BROKER_DETAILS[EMAIL],
    },
    FULL_ADDRESS: {
      ID: FULL_ADDRESS,
      ...BROKER_DETAILS[FULL_ADDRESS],
    },
  },
  SAVE_AND_BACK_URL: `#${referenceNumber}`,
});

/**
 * Render the Broker details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Broker details page
 */
export const get = (req: Request, res: Response) => {
  try {
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
      application: mapApplicationToFormFields(application),
    });
  } catch (err) {
    console.error('Error getting broker details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Policy - Broker details validation errors and if successful, redirect to the next part of the flow.
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
  const sanitisedData = sanitiseData(payload);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      submittedValues: sanitisedData,
      validationErrors,
    });
  }

  try {
    const saveResponse = await mapAndSave.broker(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`);
  } catch (err) {
    console.error('Error updating application - policy - broker details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
