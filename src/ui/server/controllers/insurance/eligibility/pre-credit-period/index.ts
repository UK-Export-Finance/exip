import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD,
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    user: req.session.user,
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

export const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      user: req.session.user,
      validationErrors,
    });
  }

  const answer = req.body[FIELD_ID];

  if (answer === 'true') {
    const { INSURANCE } = PAGES;
    const { APPLY_OFFLINE } = INSURANCE;
    const { REASON } = APPLY_OFFLINE;

    req.flash('exitReason', REASON.NEED_PRE_CREDIT_PERIOD_COVER);

    return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER);
};
