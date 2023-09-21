import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      riskCategory
      canGetAQuoteOnline
      canGetAQuoteByEmail
      cannotGetAQuote
      canApplyOnline
      canApplyOffline
      cannotApply
    }
  }
`;

export default getApimCisCountries;
