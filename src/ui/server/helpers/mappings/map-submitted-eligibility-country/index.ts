import { FIELD_IDS } from '../../../constants';
import { Country } from '../../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = FIELD_IDS;

/**
 * mapSubmittedEligibilityCountry
 * Map a submitted eligibility country and canApplyOnline into an object with BUYER_COUNTRY
 * @param {Object} Country
 * @param {Boolean} Flag if the country can get a quote online
 * @returns {Object} Object with BUYER_COUNTRY object, country fields and canApplyOnline flag
 */
const mapSubmittedEligibilityCountry = (country: Country, canApplyOnline: boolean) => {
  const { name, isoCode, riskCategory } = country;

  const mapped = {
    [BUYER_COUNTRY]: {
      name,
      isoCode,
      riskCategory,
      canApplyOnline,
    },
  };

  return mapped;
};

export default mapSubmittedEligibilityCountry;
