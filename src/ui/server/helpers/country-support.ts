import { Country } from '../../types';

export const canGetAQuoteOnline = (c: Country) => {
  if (c.riskCategory && c.shortTermCoverAvailable && c.nbiIssueAvailable) {
    return true;
  }

  return false;
};

export const canGetAQuoteByEmail = (c: Country) => {
  if (c.riskCategory && c.shortTermCoverAvailable && !c.nbiIssueAvailable) {
    return true;
  }

  return false;
};

export const cannotGetAQuote = (c: Country) => {
  if (!c.riskCategory || (!c.shortTermCoverAvailable && !c.nbiIssueAvailable)) {
    return true;
  }

  return false;
};
