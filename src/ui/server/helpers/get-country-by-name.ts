import { Country } from '../../types';

const getCountryByName = (countries: Array<Country>, countryName: string) => {
  const country = countries.find((c) => c.name === countryName);

  return country;
};

export default getCountryByName;
