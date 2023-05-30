import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import { mapCisCountries } from '../../../../helpers/mappings/map-cis-countries';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByName from '../../../../helpers/get-country-by-name';
import { canApplyOnline, canApplyOffline, cannotApply } from '../../../../helpers/country-support';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.BUYER_COUNTRY;

export const get = async (req: Request, res: Response) => {
  try {
    if (!req.session.submittedData || !req.session.submittedData.insuranceEligibility) {
      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: {},
      };
    }

    const countries = await api.external.getCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let countryValue;

    if (req.session.submittedData && req.session.submittedData.insuranceEligibility[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]) {
      countryValue = req.session.submittedData.insuranceEligibility[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];
    }

    let mappedCountries;

    if (countryValue) {
      mappedCountries = mapCisCountries(countries, countryValue.isoCode);
    } else {
      mappedCountries = mapCisCountries(countries);
    }

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      countries: mappedCountries,
      submittedValues: req.session.submittedData.insuranceEligibility,
    });
  } catch (err) {
    console.error('Error getting insurance - eligibility - buyer-country ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const validationErrors = generateValidationErrors(req.body);

    const countries = await api.external.getCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCisCountries(countries);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({
          ...PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        countries: mappedCountries,
        validationErrors,
      });
    }

    const submittedCountryName = req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];

    const country = getCountryByName(mappedCountries, submittedCountryName);

    if (!country) {
      return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
    }

    const applyOnline = canApplyOnline(country);

    if (applyOnline) {
      const populatedData = mapSubmittedEligibilityCountry(country, applyOnline);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
    }

    if (canApplyOffline(country)) {
      const populatedData = mapSubmittedEligibilityCountry(country, applyOnline);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
    }

    if (cannotApply(country)) {
      const populatedData = mapSubmittedEligibilityCountry(country, applyOnline);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      const { CANNOT_APPLY } = PAGES;
      const { REASON } = CANNOT_APPLY;

      const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      req.flash('exitReason', reason);

      return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
    }
  } catch (err) {
    console.error('Error posting insurance - eligibility - buyer-country ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
