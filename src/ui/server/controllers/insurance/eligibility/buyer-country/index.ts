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
  APPLY_OFFLINE,
  ELIGIBILITY: { CANNOT_APPLY: CANNOT_APPLY_ROUTE, TOTAL_VALUE_INSURED, CHECK_YOUR_ANSWERS, CONTRACT_TOO_SHORT },
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
     * If a country has no insurance support and no short term cover,
     * redirect to contract too short page.
     */
    const noShortTermCover = !country.noInsuranceSupport && !country.shortTermCover;

    if (noShortTermCover) {
      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(CONTRACT_TOO_SHORT);
    }

    if (country.canApplyForInsuranceOnline) {
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

    if (country.canApplyForInsuranceOffline) {
      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      return res.redirect(APPLY_OFFLINE);
    }

    if (country.noInsuranceSupport) {
      const populatedData = mapSubmittedEligibilityCountry(country);

      req.session.submittedData = {
        ...req.session.submittedData,
        insuranceEligibility: updateSubmittedData(populatedData, req.session.submittedData.insuranceEligibility),
      };

      const { CANNOT_APPLY } = PAGES;
      const { REASON } = CANNOT_APPLY;

      const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      req.flash('exitReason', reason);

      return res.redirect(CANNOT_APPLY_ROUTE);
    }
  } catch (err) {
    console.error('Error posting insurance - eligibility - buyer-country %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
