import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../../shared-validation/uk-goods-or-services';
import { Request, Response } from '../../../../../types';

const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  PAGE_CONTENT_STRINGS: PAGES.UK_GOODS_OR_SERVICES,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

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

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT);
};

export { PAGE_VARIABLES, get, post };
