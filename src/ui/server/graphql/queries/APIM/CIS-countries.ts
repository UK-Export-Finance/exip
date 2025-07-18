import gql from 'graphql-tag';

const getApimCisCountries = gql`
  query getApimCisCountries {
    getApimCisCountries {
      isoCode
      name
      esraClassification
      canGetAQuoteOnline
      cannotGetAQuote
      canApplyForInsuranceOnline
      noOnlineSupport
      noInsuranceSupport
      isHighRisk
    }
  }
`;

export default getApimCisCountries;
