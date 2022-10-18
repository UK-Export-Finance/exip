import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import api from '../../../../api';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByName from '../../../../helpers/get-country-by-name';
import { canApplyOnline, canApplyOffline, cannotApply } from '../../../../helpers/country-support';
import { Request, Response } from '../../../../../types';

export const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const get = async (req: Request, res: Response) => {
  const countries = await api.getCountries();

  if (!countries || !countries.length) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const mappedCountries = mapCountries(countries);

  return res.render(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
    }),
    HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
    countries: mappedCountries,
  });
};

export const post = async (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  const countries = await api.getCountries();

  if (!countries || !countries.length) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const mappedCountries = mapCountries(countries);

  if (validationErrors) {
    return res.render(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
      countries: mappedCountries,
      validationErrors,
    });
  }

  const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY] || req.body[FIELD_IDS.COUNTRY];

  const country = getCountryByName(mappedCountries, submittedCountryName);

  if (!country) {
    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  if (canApplyOnline(country)) {
    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  }

  if (canApplyOffline(country)) {
    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
  }

  if (cannotApply(country)) {
    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

    req.flash('exitReason', reason);

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
};
