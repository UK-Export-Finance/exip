import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * mapRiskCategory
 * Transform a countries risk category to a consistent string
 * @param {String} Risk category
 * @returns {String} Consistent risk category
 */
export const mapRiskCategory = (str: string) => {
  if (str === CIS.RISK.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;
  }

  if (str === CIS.RISK.HIGH) {
    return str;
  }

  if (str === CIS.RISK.VERY_HIGH) {
    return str;
  }

  return null;
};

// TODO - this isn't used. ?
/**
 * mapShortTermCoverAvailable
 * Transform a countries 'short term cover available' string to a boolean
 * @param {String} Risk category
 * @returns {Boolean}
 */
// export const mapShortTermCoverAvailable = (str: string): boolean => {
//   if (str === CIS.SHORT_TERM_COVER_AVAILABLE.YES) {
//     return true;
//   }

//   if (str === CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
//     return true;
//   }

//   if (str === CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
//     return true;
//   }

//   if (str === CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
//     return true;
//   }

//   return false;
// };

/**
 * mapNbiIssueAvailable
 * Transform a countries 'NBI issue available' string to a boolean
 * @param {String} NBI flag
 * @returns {Boolean}
 */
export const mapNbiIssueAvailable = (str: string): boolean => {
  if (str === CIS.NBI_ISSUE_AVAILABLE.YES) {
    return true;
  }

  return false;
};

/**
 * filterCisCountries
 * Filter out countries from CIS API that have an invalid name
 * @param {Array} All CIS countries
 * @returns {Array} CIS countries without invalid country names
 */
export const filterCisCountries = (countries: Array<CisCountry>) => countries.filter((country) => !CIS.INVALID_COUNTRIES.includes(country.marketName));

/**
 * mapCisCountry
 * Map a CIS country to cleaner structure
 * @param {Object} CIS Country
 * @returns {Object} Mapped country
 */
export const mapCisCountry = (country: CisCountry): Country => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClassificationDesc),
    shortTermCover: country.shortTermCoverAvailabilityDesc,
    nbiIssueAvailable: mapNbiIssueAvailable(country.NBIIssue),
  } as Country;

  return mapped;
};

/**
 * mapCisCountries
 * Map all CIS countries to cleaner structure
 * @param {Array} Array of CIS Countries
 * @returns {Array} Array of mapped countries
 */
export const mapCisCountries = (countries: Array<CisCountry>) => {
  const filteredCountries = filterCisCountries(countries);

  const mapped = filteredCountries.map((country) => mapCisCountry(country));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

export default mapCisCountries;
