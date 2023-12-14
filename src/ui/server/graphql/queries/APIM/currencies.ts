import gql from 'graphql-tag';

const getApimCurrencies = gql`
  query getApimCurrencies {
    getApimCurrencies {
      isoCode
      name
    }
  }
`;

export default getApimCurrencies;
