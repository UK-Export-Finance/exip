import gql from 'graphql-tag';

const getCountriesAndCurrencies = gql`
  query getCountriesAndCurrencies {
    getCountriesAndCurrencies {
      countries {
        isoCode
        name
        riskCategory
        canGetAQuoteOnline
        canGetAQuoteOffline
        canGetAQuoteByEmail
        cannotGetAQuote
        cannotApply
        canApplyForInsuranceOnline
        noInsuranceSupport
        shortTermCover
      }
      currencies {
        supportedCurrencies {
          isoCode
          name
        }
        alternativeCurrencies {
          isoCode
          name
        }
        allCurrencies {
          isoCode
          name
        }
      }
    }
  }
`;

export default getCountriesAndCurrencies;
