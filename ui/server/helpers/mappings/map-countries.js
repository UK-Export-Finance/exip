const { API } = require('../../constants');
const sortArrayAlphabetically = require('../sort-array-alphabetically');

const mapRiskCategory = (str) => {
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

const mapIsSupported = (country) => {
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

const mapCountry = (country, selectedIsoCode) => {
  const mapped = {
    name: country.marketName,
    isoCode: country.isoCode,
    value: country.isoCode,
    riskCategory: mapRiskCategory(country.ESRAClasificationDesc),
  };

  mapped.isSupported = mapIsSupported({
    ...country,
    riskCategory: mapped.riskCategory,
  });

  if (selectedIsoCode && country.isoCode === selectedIsoCode) {
    mapped.selected = true;
  }

  return mapped;
};

const mapCountries = (countries, selectedIsoCode) => {
  const mapped = countries.map((country) => mapCountry(country, selectedIsoCode));

  const sorted = sortArrayAlphabetically(mapped, 'name');

  return sorted;
};

module.exports = {
  mapRiskCategory,
  mapIsSupported,
  mapCountry,
  mapCountries,
};
