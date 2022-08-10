import { API } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { CisCountry, Country } from '../../../types';

const mapRiskCategory = (str: string) => {
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

const mapIsSupported = (country: CisCountry) => {
  if (!country.riskCategory) {
    return false;
  }

  const shortTermCoverAvailable = (country.shortTermCoverAvailabilityDesc === 'Yes');
  const nbiAvailable = (country.NBIIssue === 'Y');

  const isSupported = (shortTermCoverAvailable && nbiAvailable);

  if (isSupported) {
    return true;
  }

  return false;
};

const mapCountry = (country: CisCountry, selectedIsoCode?: string): Country => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    value: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClasificationDesc),
  } as Country;

  mapped.isSupported = mapIsSupported({
    ...country,
    riskCategory: mapped.riskCategory,
  });

  if (selectedIsoCode && country.isoCode === selectedIsoCode) {
    mapped.selected = true;
  }

  return mapped;
};

const mapCountries = (countries: Array<CisCountry>, selectedIsoCode?: string) => {
  const mapped = countries.map((country) => mapCountry(country, selectedIsoCode));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

export {
  mapRiskCategory,
  mapIsSupported,
  mapCountry,
  mapCountries,
};
