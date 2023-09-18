import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query {
    getApimCisCountries {
      isoCode
      marketName
    }
  }
`;

export default getApimCisCountries;
