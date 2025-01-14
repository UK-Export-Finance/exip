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
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const { NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME } = POLICY_FIELD_IDS.BROKER_DETAILS;

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_DETAILS_SAVE_AND_BACK, BROKER_ADDRESSES_ROOT, BROKER_ADDRESSES_CHANGE, BROKER_MANUAL_ADDRESS_ROOT, BROKER_MANUAL_ADDRESS_CHANGE },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { BROKER_DETAILS } = POLICY_FIELDS;

export const FIELD_IDS = [NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_DETAILS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_DETAILS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
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
    IS_BASED_IN_UK: {
      ID: IS_BASED_IN_UK,
      ...BROKER_DETAILS[IS_BASED_IN_UK],
    },
    POSTCODE: {
      ID: POSTCODE,
      ...BROKER_DETAILS[POSTCODE],
    },
    BUILDING_NUMBER_OR_NAME: {
      ID: BUILDING_NUMBER_OR_NAME,
      ...BROKER_DETAILS[BUILDING_NUMBER_OR_NAME],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

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
        HTML_FLAGS,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
    });
  } catch (error) {
    console.error('Error getting broker details %o', error);

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

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);
  const sanitisedData = sanitiseData(payload);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(referenceNumber),
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

    const isBasedInUk = payload[IS_BASED_IN_UK] === 'true';
    const isNotBasedInUk = payload[IS_BASED_IN_UK] === 'false';

    /**
     * If broker IS_BASED_IN_UK is true,
     * and is a change route, redirect to BROKER_ADDRESSES_CHANGE.
     * * or is a check-and-change route, redirect to CHECK_AND_CHANGE_ROUTE.
     * Otherwise, redirect to BROKER_ADDRESSES.
     */
    if (isBasedInUk) {
      if (isChangeRoute(req.originalUrl)) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ADDRESSES_CHANGE}`);
      }

      if (isCheckAndChangeRoute(req.originalUrl)) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`);
    }

    /**
     * If broker IS_BASED_IN_UK is false,
     * and is a change route, redirect to BROKER_MANUAL_ADDRESS_CHANGE.
     * or is a check-and-change route, redirect to CHECK_AND_CHANGE_ROUTE.
     * Otherwise, redirect to BROKER_MANUAL_ADDRESS.
     */
    if (isNotBasedInUk) {
      if (isChangeRoute(req.originalUrl)) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_CHANGE}`);
      }

      if (isCheckAndChangeRoute(req.originalUrl)) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`);
  } catch (error) {
    console.error('Error updating application - policy - broker details %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
