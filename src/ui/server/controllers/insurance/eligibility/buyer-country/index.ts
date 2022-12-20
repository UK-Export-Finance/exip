import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import api from '../../../../api';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByName from '../../../../helpers/get-country-by-name';
import { canApplyOnline, canApplyOffline, cannotApply } from '../../../../helpers/country-support';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

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

  return res.render(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
    ...singleInputPageVariables({
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
    }),
    countries: mappedCountries,
    submittedValues: req.session.submittedData.insuranceEligibility,
  });
};

export const post = async (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  const countries = await api.external.getCountries();

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
      countries: mappedCountries,
      validationErrors,
    });
  }

  const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY];

  const country = getCountryByName(mappedCountries, submittedCountryName);

  if (!country) {
    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  if (canApplyOnline(country)) {
    const populatedData = {
      [FIELD_IDS.BUYER_COUNTRY]: {
        name: country.name,
        isoCode: country.isoCode,
        riskCategory: country.riskCategory,
      },
    };

    req.session.submittedData = {
      ...req.session.submittedData,
      insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
    };

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  }

  if (canApplyOffline(country)) {
    return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
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
