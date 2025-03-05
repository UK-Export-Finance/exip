import gql from 'graphql-tag';

const ordnanceSurveyAddressesQuery = gql`
  query getOrdnanceSurveyAddresses($postcode: String!, $houseNameOrNumber: String!) {
    getOrdnanceSurveyAddresses(postcode: $postcode, houseNameOrNumber: $houseNameOrNumber) {
      success
      addresses {
        addressLine1
        addressLine2
        town
        county
        postcode
      }
      noAddressesFound
      apiError
      invalidPostcode
    }
  }
`;

export default ordnanceSurveyAddressesQuery;
