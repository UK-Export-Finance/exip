import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import api from '../../../../api';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByName from '../../../../helpers/get-country-by-name';
import { canGetAQuoteOnline, canGetAQuoteByEmail, cannotGetAQuote } from '../../../../helpers/country-support';
import { Request, Response } from '../../../../../types';

export const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: PAGES.QUOTE.BUYER_COUNTRY,
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
    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  // TODO:
  // cannotGetAQuote
  // need to apply using a form

  if (needToApplyUsingOfflineForm(country)) {
    //  return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_APPLY_USING_OFFLINE_FORM);
  }

  // if (canGetAQuoteOnline(country)) {
  //   const populatedData = {
  //     ...req.body,
  //     [FIELD_IDS.BUYER_COUNTRY]: {
  //       name: country.name,
  //       isoCode: country.isoCode,
  //       riskCategory: country.riskCategory,
  //     },
  //   };

  //   req.session.submittedData = updateSubmittedData(populatedData, req.session.submittedData);

  //   if (isChangeRoute(req.originalUrl)) {
  //     return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  //   }

  //   return res.redirect(ROUTES.QUOTE.BUYER_BODY);
  // }

  // if (canGetAQuoteByEmail(country)) {
  //   req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

  //   const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
  //   const { REASON } = GET_A_QUOTE_BY_EMAIL;

  //   req.flash('exitReason', REASON.BUYER_COUNTRY);
  //   req.flash('exitDescription', REASON.BUYER_COUNTRY_DESCRIPTION);

  //   return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  // }

  // if (cannotGetAQuote(country)) {
  //   req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

  //   const { CANNOT_OBTAIN_COVER } = PAGES.INSURANCE.ELIGIBILITY;
  //   const { REASON } = CANNOT_OBTAIN_COVER;

  //   const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

  //   req.flash('exitReason', reason);

  //   return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_OBTAIN_COVER);
  // }

  return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
};
