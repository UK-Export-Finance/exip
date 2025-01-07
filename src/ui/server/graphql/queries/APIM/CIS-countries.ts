import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      esraClassification
      canGetAQuoteOnline
      canGetAQuoteOffline
      canGetAQuoteByEmail
      cannotGetAQuote
      cannotApply
      canApplyForInsuranceOnline
      noInsuranceSupport
      shortTermCover
    }
  }
`;

export default getApimCisCountries;
