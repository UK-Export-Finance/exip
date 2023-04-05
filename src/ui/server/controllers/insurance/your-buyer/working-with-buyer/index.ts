import { PAGES } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import mapAndSave from '../map-and-save';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';

const {
  YOUR_BUYER: { WORKING_WITH_BUYER },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: YOUR_BUYER_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
} = ROUTES.INSURANCE;

const { WORKING_WITH_BUYER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER, CONNECTED_WITH_BUYER } = WORKING_WITH_BUYER;

export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    CONNECTED_WITH_BUYER: {
      ID: CONNECTED_WITH_BUYER,
      ...FIELDS.WORKING_WITH_BUYER[CONNECTED_WITH_BUYER],
    },
    TRADED_WITH_BUYER: {
      ID: TRADED_WITH_BUYER,
      ...FIELDS.WORKING_WITH_BUYER[TRADED_WITH_BUYER],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER;

export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
        BACK_LINK: req.headers.referer,
      }),
      user: req.session.user,
      ...pageVariables(application.referenceNumber),
      application: mapApplicationToFormFields(application),
    });
  } catch (err) {
    console.error('Error getting insurance - your buyer - working with the buyer ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;
    const { body } = req;

    const validationErrors = generateValidationErrors(body);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
          BACK_LINK: req.headers.referer,
        }),
        user: req.session.user,
        ...pageVariables(application.referenceNumber),
        submittedValues: body,
        application: mapApplicationToFormFields(application),
        validationErrors,
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.yourBuyer(body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error posting insurance - your buyer - working with the buyer ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
