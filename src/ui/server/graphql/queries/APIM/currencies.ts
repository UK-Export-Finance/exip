import gql from 'graphql-tag';

const getApimCurrencies = gql`
  query getApimCurrencies {
    getApimCurrencies {
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

export default getApimCurrencies;
