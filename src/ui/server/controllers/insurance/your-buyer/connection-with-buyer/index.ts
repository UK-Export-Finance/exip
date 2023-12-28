import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { TRADED_WITH_BUYER, CONNECTION_WITH_BUYER_SAVE_AND_BACK: SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

export const FIELD_IDS = [CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION];

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    CONNECTION_WITH_BUYER: {
      ID: CONNECTION_WITH_BUYER,
      HINT: PAGE_CONTENT_STRINGS.HINT,
    },
    CONNECTION_WITH_BUYER_DESCRIPTION: {
      ID: CONNECTION_WITH_BUYER_DESCRIPTION,
      ...FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION],
      MAXIMUM: 1000,
    },
  },
  PAGE_CONTENT_STRINGS,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
});

/**
 * get
 * Render the connection to the buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Connection to the buyer page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
    });
  } catch (err) {
    console.error('Error getting connection to the buyer %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check connection to the buyer validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        validationErrors,
        submittedValues: sanitiseData(payload),
      });
    }

    // if no errors, then runs save api call
    const saveResponse = await mapAndSave.yourBuyer(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`);
  } catch (err) {
    console.error('Error posting connection to the buyer %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
