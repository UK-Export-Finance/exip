import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/broker';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const { USING_BROKER, LEGEND, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL, DETAILS } = POLICY_FIELD_IDS.BROKER;

const { BROKER } = PAGES.INSURANCE.POLICY;
const { BROKER: BROKER_TEMPLATE } = TEMPLATES.INSURANCE.POLICY;

export const TEMPLATE = BROKER_TEMPLATE;

export const FIELD_IDS = [USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE, EMAIL];

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { BROKER: BROKER_FIELDS } = POLICY_FIELDS;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    USING_BROKER: {
      ID: USING_BROKER,
    },
    LEGEND: {
      ID: LEGEND,
      ...BROKER_FIELDS[LEGEND],
    },
    NAME: {
      ID: NAME,
      ...BROKER_FIELDS[NAME],
    },
    ADDRESS_LINE_1: {
      ID: ADDRESS_LINE_1,
      ...BROKER_FIELDS[ADDRESS_LINE_1],
    },
    ADDRESS_LINE_2: {
      ID: ADDRESS_LINE_2,
      ...BROKER_FIELDS[ADDRESS_LINE_2],
    },
    TOWN: {
      ID: TOWN,
      ...BROKER_FIELDS[TOWN],
    },
    COUNTY: {
      ID: COUNTY,
      ...BROKER_FIELDS[COUNTY],
    },
    POSTCODE: {
      ID: POSTCODE,
      ...BROKER_FIELDS[POSTCODE],
    },
    EMAIL: {
      ID: EMAIL,
      ...BROKER_FIELDS[EMAIL],
    },
    DETAILS: {
      ID: DETAILS,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_SAVE_AND_BACK}`,
});

/**
 * gets the template for broker page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders check your answers page with previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: BROKER,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...pageVariables(application.referenceNumber),
    });
  } catch (err) {
    console.error('Error getting broker %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts broker page
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Broker page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    const { body } = req;

    const sanitisedData = sanitiseData(body);

    const payload = constructPayload(sanitisedData, FIELD_IDS);

    // run validation on inputs
    const validationErrors = generateValidationErrors(payload);

    // if any errors then render template with errors
    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: BROKER,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.broker(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - your business - broker %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
