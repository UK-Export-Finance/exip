import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import api from '../../../../api';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';

const FIELD_ID = FIELD_IDS.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.YOUR_BUYER,
};

export const get = async (req: Request, res: Response) => {
  // console.log('called at steop');
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
  // // eslint-disable-next-line no-console
  // console.log(mappedCountries);
  return res.render(TEMPLATES.YOUR_BUYER.BUYER_COMPANY_DETAILS, {
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
    }),
    countries: mappedCountries,
    submittedValues: req.session.submittedData.insuranceEligibility,
  });
};
