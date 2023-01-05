import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { yourBuyerPageVariables } from '../../../../constants/field-ids/insurance/your-buyer';
import { mapCountriesSelect } from '../../../../helpers/mappings/map-countries-select';
import { yourBuyerDetailsValidation } from './validation/yourBuyerDetailsValidation';

export const get = async (req: Request, res: Response) => {
  if (!req.session.submittedData || !req.session.submittedData.insuranceEligibility) {
    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: {},
    };
  }

  const countries = await api.external.getCountries();

  if (!countries || !countries.length) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const mappedCountries = mapCountriesSelect(countries);

  return res.render(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    ...yourBuyerPageVariables(),
    countries: mappedCountries,
  });
};

export const post = async (req: Request, res: Response) => {
  const validationErrors = yourBuyerDetailsValidation(req.body);
  if (validationErrors && Object.keys(validationErrors).length) {
    return res.render(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...yourBuyerPageVariables(),
      validationErrors,
    });
  }
  return res.redirect('/needs_to_redirect_at_do_you_need_broker');
};
