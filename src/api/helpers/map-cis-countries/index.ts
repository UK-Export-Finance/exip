import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, MappedCisCountry } from '../../types';

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

/**
 * mapShortTermCoverAvailable
 * Transform a countries 'short term cover available' string to a boolean
 * @param {String} Risk category
 * @returns {Boolean}
 */
export const mapShortTermCoverAvailable = (str: string): boolean => {
  if (str === CIS.SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }

  if (str === CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (str === CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (str === CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
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
  if (str === CIS.NBI_ISSUE_AVAILABLE.YES) {
    return true;
  }

  return false;
};

/**
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const canGetAQuoteOnline = (country: MappedCisCountry) => {
  if (country.riskCategory && country.shortTermCover && country.nbiIssueAvailable) {
    return true;
  }

  return false;
};

/**
 * canGetAQuoteByEmail
 * Check if a country is able to get a quote by email
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const canGetAQuoteByEmail = (country: MappedCisCountry) => {
  if (country.riskCategory && country.shortTermCover && !country.nbiIssueAvailable) {
    return true;
  }

  return false;
};

/**
 * cannotGetAQuote
 * Check if a country cannot get a quote online or offline
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const cannotGetAQuote = (country: MappedCisCountry) => {
  if (!country.riskCategory || (!country.shortTermCover && !country.nbiIssueAvailable)) {
    return true;
  }

  return false;
};

/**
 * canApplyOffline
 * Check if a country can get a quote offline
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyOffline = (originalShortTermCover: string) => {
  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
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
export const mapCisCountry = (country: CisCountry): MappedCisCountry => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClassificationDesc),
    shortTermCover: mapShortTermCoverAvailable(country.shortTermCoverAvailabilityDesc),
    nbiIssueAvailable: mapNbiIssueAvailable(country.NBIIssue),
  } as MappedCisCountry;

  mapped.canGetAQuoteOnline = canGetAQuoteOnline(mapped);
  mapped.canGetAQuoteByEmail = canGetAQuoteByEmail(mapped);

  mapped.cannotGetAQuote = cannotGetAQuote(mapped);
  mapped.canApplyOnline = mapped.shortTermCover;
  mapped.canApplyOffline = canApplyOffline(country.shortTermCoverAvailabilityDesc);

  mapped.cannotApply = !mapped.canApplyOnline && !mapped.canApplyOffline;

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
