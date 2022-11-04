import { PAGES, UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION, UK_GOODS_AND_SERVICES_DESCRIPTION, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.UK_GOODS_OR_SERVICES,
    UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION,
    UK_GOODS_AND_SERVICES_DESCRIPTION,
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      validationErrors,
    });
  }

  const answer = req.body[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES];

  if (answer === 'false') {
    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  req.session.submittedData.insuranceEligibility = updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility);

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT);
};

export { PAGE_VARIABLES, get, post };
