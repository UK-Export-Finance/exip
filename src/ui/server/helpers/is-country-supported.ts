import { Country } from '../../types';

const isCountrySupported = (country: Country) => {
  if (country.isSupported === true) {
    return true;
  }

  return false;
};

export default isCountrySupported;
