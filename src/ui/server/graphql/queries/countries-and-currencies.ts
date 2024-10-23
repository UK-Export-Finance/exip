import gql from 'graphql-tag';

const getCountriesAndCurrencies = gql`
  query getCountriesAndCurrencies {
    getCountriesAndCurrencies {
      countries {
        isoCode
        name
      }
      supportedCurrencies {
        isoCode
        name
      }
      alternativeCurrencies {
        isoCode
        name
      }
      allCurrencies {
        isoCode
        name
      }
    }
  }
`;

export default getCountriesAndCurrencies;
