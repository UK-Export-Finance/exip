import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { yourBuyerPageVariables } from '../../../../constants/field-ids/insurance/your-buyer';
import { mapCountriesSelect } from '../../../../helpers/mappings/map-countries-select';

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

  return res.render(TEMPLATES.YOUR_BUYER.BUYER_COMPANY_DETAILS, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.YOUR_BUYER,
      BACK_LINK: req.headers.referer,
    }),
    ...yourBuyerPageVariables(),
    countries: mappedCountries,
    submittedValues: req.session.submittedData.insuranceEligibility,
  });
};
