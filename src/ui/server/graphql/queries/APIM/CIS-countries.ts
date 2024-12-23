import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      esraClassification
      canGetAQuoteOnline
      cannotGetAQuote
      cannotApply
      canApplyForInsuranceOnline
      noOnlineSupport
      noInsuranceSupport
    }
  }
`;

export default getApimCisCountries;
