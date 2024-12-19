import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import { objectHasProperty } from '../../../helpers/object';
import { isPopulatedArray } from '../../../helpers/array';
import mapCountries from '../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByIsoCode from '../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.BUYER_COUNTRY;

/**
 * If the user has come from the base root of the application (which redirects to this route)
 * Return the "Before you start" page, which is the original, external URL.
 * An empty base root is required to refresh req.session data.
 * This cannot be done in the first page (Buyer country) because there are scenarios/flows where the data needs to be populated.
 * Otherwise:
 * - if user has come from Check Answers or Quote page page, return the same URL.
 * - if it's Buyer country route, user has submitted the form and has validation errors.
 * @param {String} referer - Previous URL
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

  if (!submittedData || !objectHasProperty(submittedData, 'quoteEligibility')) {
    req.session.submittedData = {
      ...req.session.submittedData,
      quoteEligibility: {},
    };
  }

  try {
    const countries = await api.keystone.APIM.getCisCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { quoteEligibility } = req.session.submittedData;

    const mappedCountries = mapCountries(countries, quoteEligibility[FIELD_ID]?.isoCode);

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
      userName: getUserNameFromSession(req.session.user),
      countries: mappedCountries,
      submittedValues: req.session.submittedData?.quoteEligibility,
      isChangeRoute: isChangeRoute(req.originalUrl),
    });
  } catch (error) {
    console.error('Error getting CIS countries %o', error);

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const countries = await api.keystone.APIM.getCisCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCountries(countries);

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
        userName: getUserNameFromSession(req.session.user),
        countries: mappedCountries,
        validationErrors,
        isChangeRoute: isChangeRoute(req.originalUrl),
      });
    }

    const submittedCountryName = payload[FIELD_ID];

    const country = getCountryByIsoCode(countries, submittedCountryName);

    if (!country) {
      return res.redirect(ROUTES.QUOTE.CANNOT_APPLY_EXIT);
    }

    /**
     * If a country cannot get a quote online,
     * redirect to a specific exit page.
     */
    if (country.canGetAQuoteOnline) {
      console.info('Country support - %s - can get a quote online', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

      if (isChangeRoute(req.originalUrl)) {
        return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
      }

      return res.redirect(ROUTES.QUOTE.BUYER_BODY);
    }

    /**
     * If a country can get a quote by email,
     * redirect to a specific exit page.
     */
    if (country.canGetAQuoteByEmail) {
      console.info('Country support - %s - can get a quote by email', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

      req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

      const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
      const { REASON } = GET_A_QUOTE_BY_EMAIL;

      req.flash('exitReason', REASON.BUYER_COUNTRY);
      req.flash('exitDescription', REASON.BUYER_COUNTRY_DESCRIPTION);

      return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
    }

    /**
     * If a country cannot get a quote,
     * redirect to a specific exit page.
     */
    if (country.cannotGetAQuote) {
      console.info('Country support - %s - cannot a quote', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

      req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

      const { CANNOT_APPLY_EXIT } = PAGES;
      const { REASON } = CANNOT_APPLY_EXIT;

      const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      req.flash('exitReason', reason);

      return res.redirect(ROUTES.QUOTE.CANNOT_APPLY_EXIT);
    }
  } catch (error) {
    console.error('Error getting CIS countries %o', error);

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
