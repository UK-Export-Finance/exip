import { Country } from '../../types';

const getCountryByName = (countries: Array<Country>, countryName: string): Country => {
  const country = countries.find((c) => c.name === countryName) as Country;

  return country;
};

export default getCountryByName;
