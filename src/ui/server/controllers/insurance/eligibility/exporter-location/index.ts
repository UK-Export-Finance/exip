import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../content-strings/fields/insurance/eligibility';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { objectHasProperty } from '../../../../helpers/object';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION;

export const PAGE_VARIABLES = {
  FIELD_ID,
  FIELD: FIELDS[FIELD_ID],
  PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
  HAS_SAVE_AND_BACK: false,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

const { CHECK_YOUR_ANSWERS, CANNOT_APPLY: CANNOT_APPLY_ROUTE, COMPANIES_HOUSE_NUMBER } = INSURANCE_ROUTES.ELIGIBILITY;

export const get = (req: Request, res: Response) => {
  const { submittedData } = req.session;

  if (!submittedData || !objectHasProperty(submittedData, 'insuranceEligibility')) {
    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: {},
    };
  }

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.insuranceEligibility,
  });
};

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = payload[FIELD_ID];

  if (answer === 'false') {
    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.UNSUPPORTED_COMPANY_COUNTRY);

    return res.redirect(CANNOT_APPLY_ROUTE);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(CHECK_YOUR_ANSWERS);
  }

  return res.redirect(COMPANIES_HOUSE_NUMBER);
};
