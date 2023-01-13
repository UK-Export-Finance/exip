import { PAGES } from '../../../content-strings';
import { Request, Response } from '../../../../types';
import api from '../../../api';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import mapCountries from '../../../helpers/mappings/map-countries';
import yourBuyerDetailsValidation from './validation';
import { FIELDS } from '../../../content-strings/fields/insurance/your-buyer';

export const get = async (req: Request, res: Response) => {
  const countries = await api.keystone.countries.getAll();

  if (!countries || !countries.length) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
  const mappedCountries = mapCountries(countries);
  return res.render(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
      BACK_LINK: req.headers.referer,
    }),
    ...FIELDS,
    countries: mappedCountries,
  });
};

export const post = async (req: Request, res: Response) => {
  const validationErrors = yourBuyerDetailsValidation(req.body);

  if (validationErrors && Object.keys(validationErrors).length) {
    const countries = await api.keystone.countries.getAll();
    if (!countries || !countries.length) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
    const mappedCountries = mapCountries(countries);

    return res.render(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
        BACK_LINK: req.headers.referer,
      }),
      ...FIELDS,
      submittedValues: req.body,
      countries: mappedCountries,
      validationErrors,
    });
  }
  return res.redirect('/needs_to_redirect_at_do_you_need_broker');
};
