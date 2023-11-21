import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import api from '../../../../api';
import { objectHasProperty } from '../../../../helpers/object';
import { isPopulatedArray } from '../../../../helpers/array';
import mapCountries from '../../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByName from '../../../../helpers/get-country-by-name';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.BUYER_COUNTRY;

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

export const get = async (req: Request, res: Response) => {
  try {
    const countries = await api.keystone.APIM.getCisCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    let countryValue;
    const { insuranceEligibility } = req.session.submittedData;

    if (objectHasProperty(insuranceEligibility, FIELD_ID)) {
      countryValue = insuranceEligibility[FIELD_ID];
    }

    let mappedCountries;

    if (countryValue) {
      mappedCountries = mapCountries(countries, countryValue.isoCode);
    } else {
      mappedCountries = mapCountries(countries);
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
    console.error('Error getting insurance - eligibility - buyer-country %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload);

    const countries = await api.keystone.APIM.getCisCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCountries(countries);

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

    const submittedCountryName = payload[FIELD_ID];

    const country = getCountryByName(countries, submittedCountryName);

    if (!country) {
      return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
    }

    if (country.canApplyForInsuranceOnline) {
      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED);
    }

    if (country.canApplyForInsuranceOffline) {
      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(ROUTES.INSURANCE.APPLY_OFFLINE);
    }

    if (country.cannotGetAQuoteOrApplyForInsurance) {
      const populatedData = mapSubmittedEligibilityCountry(country);

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
    console.error('Error posting insurance - eligibility - buyer-country %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
