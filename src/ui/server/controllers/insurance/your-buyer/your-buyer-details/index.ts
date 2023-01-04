import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import api from '../../../../api';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { yourBuyerPageVariables } from '../../../../constants/field-ids/insurance/your-buyer';

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

  let countryValue;

  if (req.session.submittedData && req.session.submittedData.insuranceEligibility[FIELD_IDS.BUYER_COUNTRY]) {
    countryValue = req.session.submittedData.insuranceEligibility[FIELD_IDS.BUYER_COUNTRY];
  }

  let mappedCountries;

  if (countryValue) {
    mappedCountries = mapCountries(countries, countryValue.isoCode);
  } else {
    mappedCountries = mapCountries(countries);
  }

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
