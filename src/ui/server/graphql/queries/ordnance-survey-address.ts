import gql from 'graphql-tag';

const ordnanceSurveyAddressQuery = gql`
  query ($postcode: String!, $houseNameOrNumber: String!) {
    getOrdnanceSurveyAddress(postcode: $postcode, houseNameOrNumber: $houseNameOrNumber) {
      success
      addresses {
        addressLine1
        addressLine2
        town
        county
        postalCode
      }
      noAddressesFound
      apiError
      invalidPostcode
    }
  }
`;

export default ordnanceSurveyAddressQuery;
