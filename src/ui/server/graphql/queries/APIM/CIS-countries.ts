import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      esraClassification
      canGetAQuoteOnline
      canGetAQuoteOffline
      noOnlineSupport
      cannotGetAQuote
      cannotApply
      canApplyForInsuranceOnline
      noOnlineSupport
      shortTermCover
    }
  }
`;

export default getApimCisCountries;
