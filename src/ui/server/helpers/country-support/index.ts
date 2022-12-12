import { Country } from '../../../types';

/**
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const canGetAQuoteOnline = (c: Country) => {
  if (c.riskCategory && c.shortTermCoverAvailable && c.nbiIssueAvailable) {
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
export const canGetAQuoteByEmail = (c: Country) => {
  if (c.riskCategory && c.shortTermCoverAvailable && !c.nbiIssueAvailable) {
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
export const cannotGetAQuote = (c: Country) => {
  if (!c.riskCategory || (!c.shortTermCoverAvailable && !c.nbiIssueAvailable)) {
    return true;
  }

  return false;
};
