import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      esraClassification
      canGetAQuoteOnline
      canGetAQuoteByEmail
      cannotGetAQuote
      canApplyForInsuranceOnline
      noOnlineInsuranceSupport
      noInsuranceSupport
      shortTermCover
    }
  }
`;

export default getApimCisCountries;
