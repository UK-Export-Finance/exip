import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import mapCountries from '../../../../helpers/mappings/map-countries';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.BUYER_COUNTRY;

const {
  PROBLEM_WITH_SERVICE,
  ELIGIBILITY: { CANNOT_APPLY_EXIT: CANNOT_APPLY_ROUTE, TOTAL_VALUE_INSURED, CHECK_YOUR_ANSWERS, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

export const get = async (req: Request, res: Response) => {
  try {
    const countries = await api.keystone.APIM.getCisCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { insuranceEligibility } = req.session.submittedData;

    const mappedCountries = mapCountries(countries, insuranceEligibility[FIELD_ID]?.isoCode);

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      countries: mappedCountries,
      submittedValues: req.session.submittedData.insuranceEligibility,
    });
  } catch (error) {
    console.error('Error getting insurance - eligibility - buyer-country %o', error);

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

    if (validationErrors) {
      const mappedCountries = mapCountries(countries);

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

    const submittedCountryIsoCode = payload[FIELD_ID];

    const country = getCountryByIsoCode(countries, submittedCountryIsoCode);

    if (!country) {
      return res.redirect(CANNOT_APPLY_ROUTE);
    }

    /**
     * If a country does not have online insurance support,
     * redirect to a specific exit page.
     */
    if (country.noOnlineInsuranceSupport) {
      console.info('Country support - %s - no online insurance support available', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    }

    /**
     * If a country cannot apply for insurance online,
     * redirect to a specific exit page.
     */
    if (country.canApplyForInsuranceOnline) {
      console.info('Country support - %s - can apply for insurance online', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      if (isChangeRoute(req.originalUrl)) {
        return res.redirect(CHECK_YOUR_ANSWERS);
      }

      return res.redirect(TOTAL_VALUE_INSURED);
    }

    /**
     * If a country has no insurance support (online or offline)
     * redirect to a specific exit page.
     */
    if (country.noInsuranceSupport) {
      console.info('Country support - %s - no insurance support', country.name);

      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      const { CANNOT_APPLY_EXIT } = PAGES;
      const { REASON } = CANNOT_APPLY_EXIT;

      const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      req.flash('exitReason', reason);

      return res.redirect(CANNOT_APPLY_ROUTE);
    }

    console.info('Country support - %s - unable to determine country support', country.name);

    return res.redirect(PROBLEM_WITH_SERVICE);
  } catch (error) {
    console.error('Error posting insurance - eligibility - buyer-country %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
