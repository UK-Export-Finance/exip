import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      riskCategory
      canGetAQuoteOnline
      canGetAQuoteOffline
      canGetAQuoteByEmail
      cannotGetAQuote
      cannotApply
      canApplyForInsuranceOnline
      canApplyForInsuranceOffline
      noInsuranceSupport
      shortTermCover
    }
  }
`;

export default getApimCisCountries;
