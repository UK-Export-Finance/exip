import { Country } from '../../../types';
import { API } from '../../constants';

export const isCoverQuoteAvailable = (str: string): boolean => {
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
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const canGetAQuoteOnline = (c: Country) => {
  const coverQuoteAvailable = isCoverQuoteAvailable(c.shortTermCover);

  if (c.riskCategory && coverQuoteAvailable && c.nbiIssueAvailable) {
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
  const coverQuoteAvailable = isCoverQuoteAvailable(c.shortTermCover);

  if (c.riskCategory && coverQuoteAvailable && !c.nbiIssueAvailable) {
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
  const coverQuoteAvailable = isCoverQuoteAvailable(c.shortTermCover);

  if (!c.riskCategory || (!coverQuoteAvailable && !c.nbiIssueAvailable)) {
    return true;
  }

  return false;
};

export const canApplyOnline = (c: Country) => {
  if (c.shortTermCover === API.CIS.SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }

  return false;
};

export const canApplyOffline = (c: Country) => {
  if (c.shortTermCover === API.CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (c.shortTermCover === API.CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (c.shortTermCover === API.CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
    return true;
  }

  return false;
};

export const cannotApply = (c: Country) => {
  if (!canApplyOnline(c) && !canApplyOffline(c)) {
    return true;
  }

  return false;
};
