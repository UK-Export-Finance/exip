import { PAGES } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: YOUR_BUYER_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { WORKING_WITH_BUYER, COMPANY_OR_ORGANISATION_SAVE_AND_BACK, CHECK_YOUR_ANSWERS } = YOUR_BUYER_ROUTES;

const { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER } = COMPANY_OR_ORGANISATION;

export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME: {
      ID: NAME,
      ...FIELDS.COMPANY_OR_ORGANISATION[NAME],
    },
    ADDRESS: {
      ID: ADDRESS,
      ...FIELDS.COMPANY_OR_ORGANISATION[ADDRESS],
    },
    COUNTRY: {
      ID: COUNTRY,
      ...FIELDS.COMPANY_OR_ORGANISATION[COUNTRY],
    },
    REGISTRATION_NUMBER: {
      ID: REGISTRATION_NUMBER,
      ...FIELDS.COMPANY_OR_ORGANISATION[REGISTRATION_NUMBER],
    },
    WEBSITE: {
      ID: WEBSITE,
      ...FIELDS.COMPANY_OR_ORGANISATION[WEBSITE],
    },
    FIRST_NAME: {
      ID: FIRST_NAME,
      ...FIELDS.COMPANY_OR_ORGANISATION[FIRST_NAME],
    },
    LAST_NAME: {
      ID: LAST_NAME,
      ...FIELDS.COMPANY_OR_ORGANISATION[LAST_NAME],
    },
    POSITION: {
      ID: POSITION,
      ...FIELDS.COMPANY_OR_ORGANISATION[POSITION],
    },
    EMAIL: {
      ID: EMAIL,
      ...FIELDS.COMPANY_OR_ORGANISATION[EMAIL],
    },
    CAN_CONTACT_BUYER: {
      ID: CAN_CONTACT_BUYER,
      ...FIELDS.COMPANY_OR_ORGANISATION[CAN_CONTACT_BUYER],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables(application.referenceNumber),
      application: mapApplicationToFormFields(application),
    });
  } catch (err) {
    console.error('Error getting insurance - your buyer - buyers company or organisation ', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;
    const { body } = req;

    const validationErrors = generateValidationErrors(body);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        submittedValues: body,
        validationErrors,
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.yourBuyer(body, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`);
  } catch (err) {
    console.error('Error posting insurance - your buyer - buyers company or organisation ', { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
