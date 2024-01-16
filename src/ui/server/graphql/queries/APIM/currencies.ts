import gql from 'graphql-tag';

const getApimCurrencies = gql`
  query getApimCurrencies($allCurrencies: Boolean!) {
    getApimCurrencies(allCurrencies: $allCurrencies) {
      isoCode
      name
    }
  }
`;

export default getApimCurrencies;
