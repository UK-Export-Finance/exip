import { API } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../../types';

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

export const mapNbiIssueAvailable = (str: string): boolean => {
  if (str === API.CIS.NBI_ISSUE_AVAILABLE.YES) {
    return true;
  }

  return false;
};

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

export const mapCountries = (countries: Array<CisCountry>, selectedIsoCode?: string) => {
  const mapped = countries.map((country) => mapCountry(country, selectedIsoCode));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};
