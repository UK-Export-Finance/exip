import { API } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../../types';

/**
 * mapRiskCategory
 * Transform a countries risk category to a consistent string
 * @param {String} Risk category
 * @returns {String} Consistent risk category
 */
export const mapRiskCategory = (str: string) => {
  if (str === API.CIS.RISK.STANDARD) {
    return API.MAPPINGS.RISK.STANDARD;
  }

  if (str === API.CIS.RISK.HIGH) {
    return str;
  }

  if (str === API.CIS.RISK.VERY_HIGH) {
    return str;
  }

  return null;
};

/**
 * mapShortTermCoverAvailabe
 * Transform a countries 'short term cover available' string to a boolean
 * @param {String} Risk category
 * @returns {Boolean}
 */
export const mapShortTermCoverAvailable = (str: string): boolean => {
  if (str === API.CIS.SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }

  if (str === API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (str === API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (str === API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
    return true;
  }

  return false;
};

/**
 * mapNbiIssueAvailable
 * Transform a countries 'NBI issue available' string to a boolean
 * @param {String} NBI flag
 * @returns {Boolean}
 */
export const mapNbiIssueAvailable = (str: string): boolean => {
  if (str === API.CIS.NBI_ISSUE_AVAILABLE.YES) {
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
export const filterCisCountries = (countries: Array<CisCountry>) => countries.filter((country) => !API.CIS.INVALID_COUNTRIES.includes(country.marketName));

/**
 * mapCountry
 * Map a CIS country to cleaner structure
 * @param {Object} CIS Country
 * @returns {String} Selected country ISO code
 * @returns {Object} Mapped country
 */
export const mapCountry = (country: CisCountry, selectedIsoCode?: string): Country => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    value: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClasificationDesc),
    shortTermCoverAvailable: mapShortTermCoverAvailable(country.shortTermCoverAvailabilityDesc),
    nbiIssueAvailable: mapNbiIssueAvailable(country.NBIIssue),
  } as Country;

  if (selectedIsoCode && country.isoCode === selectedIsoCode) {
    mapped.selected = true;
  }

  return mapped;
};

/**
 * mapCountries
 * Map all CIS countries to cleaner structure
 * @param {Array} Array of CIS Countries
 * @returns {String} Selected country ISO code
 * @returns {Array} Array of mapped countries
 */
export const mapCountries = (countries: Array<CisCountry>, selectedIsoCode?: string) => {
  const filteredCountries = filterCisCountries(countries);

  const mapped = filteredCountries.map((country) => mapCountry(country, selectedIsoCode));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};
