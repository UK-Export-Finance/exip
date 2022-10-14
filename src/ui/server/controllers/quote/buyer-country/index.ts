import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import { mapCountries } from '../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByName from '../../../helpers/get-country-by-name';
import { canGetAQuoteOnline, canGetAQuoteByEmail, cannotGetAQuote } from '../../../helpers/country-support';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { Request, Response } from '../../../../types';

export const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.COUNTRY,
  PAGE_CONTENT_STRINGS: PAGES.QUOTE.BUYER_COUNTRY,
};

/**
 * If the user has come from the base root of the application (which redirects to this route)
 * Return the "Before you start" page, which is the original, external URL.
 * An empty base root is required to refresh req.session data.
 * This cannot be done in the first page (Buyer country) because there are scenarios/flows where the data needs to be populated.
 * Otherwise:
 * - if user has come from Check Answers or Quote page page, return the same URL.
 * - if it's Buyer country route, user has submitted the form and has validation errors.
 * @param {string} referer - Previous URL
 * @returns {string}
 */
export const getBackLink = (referer?: string): string => {
  if (!referer) {
    return LINKS.EXTERNAL.BEFORE_YOU_START;
  }

  if (referer.includes(ROUTES.QUOTE.CHECK_YOUR_ANSWERS)) {
    return referer;
  }

  if (referer.includes(ROUTES.QUOTE.YOUR_QUOTE)) {
    return referer;
  }

  if (referer.includes(ROUTES.QUOTE.BUYER_COUNTRY)) {
    return referer;
  }

  return LINKS.EXTERNAL.BEFORE_YOU_START;
};

export const get = async (req: Request, res: Response) => {
  const { submittedData } = req.session;
  const countries = await api.getCountries();

  if (!countries || !countries.length) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  let countryValue;

  if (submittedData && submittedData[FIELD_IDS.BUYER_COUNTRY]) {
    countryValue = submittedData[FIELD_IDS.BUYER_COUNTRY];
  }

  let mappedCountries;

  if (countryValue) {
    mappedCountries = mapCountries(countries, countryValue.isoCode);
  } else {
    mappedCountries = mapCountries(countries);
  }

  return res.render(TEMPLATES.QUOTE.BUYER_COUNTRY, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    BACK_LINK: getBackLink(req.headers.referer),
    HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
    countries: mappedCountries,
    submittedValues: req.session.submittedData,
    isChangeRoute: isChangeRoute(req.originalUrl),
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
    return res.render(TEMPLATES.QUOTE.BUYER_COUNTRY, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      BACK_LINK: getBackLink(req.headers.referer),
      HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
      countries: mappedCountries,
      validationErrors,
      isChangeRoute: isChangeRoute(req.originalUrl),
    });
  }

  const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY] || req.body[FIELD_IDS.COUNTRY];

  const country = getCountryByName(mappedCountries, submittedCountryName);

  if (!country) {
    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  if (canGetAQuoteOnline(country)) {
    const populatedData = {
      ...req.body,
      [FIELD_IDS.BUYER_COUNTRY]: {
        name: country.name,
        isoCode: country.isoCode,
        riskCategory: country.riskCategory,
      },
    };

    req.session.submittedData = updateSubmittedData(populatedData, req.session.submittedData);

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    }

    return res.redirect(ROUTES.QUOTE.BUYER_BODY);
  }

  if (canGetAQuoteByEmail(country)) {
    req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

    const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
    const { REASON } = GET_A_QUOTE_BY_EMAIL;

    req.flash('exitReason', REASON.BUYER_COUNTRY);
    req.flash('exitDescription', REASON.BUYER_COUNTRY_DESCRIPTION);

    return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  }

  if (cannotGetAQuote(country)) {
    req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

    const { CANNOT_OBTAIN_COVER } = PAGES.QUOTE;
    const { REASON } = CANNOT_OBTAIN_COVER;

    const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

    req.flash('exitReason', reason);

    return res.redirect(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  }

  return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
};
