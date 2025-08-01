import { FIELD_IDS } from '../../../constants';
import { Country } from '../../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = FIELD_IDS;

/**
 * mapSubmittedEligibilityCountry
 * Map a submitted eligibility country and canApplyOnline into an object with BUYER_COUNTRY
 * @param {object} Country
 * @returns {object} Object with BUYER_COUNTRY object, country fields and canApplyOnline flag
 */
const mapSubmittedEligibilityCountry = (country: Country) => {
  const { name, isoCode, esraClassification, isHighRisk } = country;

  const mapped = {
    [BUYER_COUNTRY]: {
      name,
      isoCode,
      esraClassification,
      canApplyOnline: country.canGetAQuoteOnline || country.canApplyForInsuranceOnline,
      isHighRisk,
    },
  };

  return mapped;
};

export default mapSubmittedEligibilityCountry;
