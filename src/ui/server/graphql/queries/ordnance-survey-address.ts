import gql from 'graphql-tag';

const ordnanceSurveyAddressQuery = gql`
  query ($postcode: String!, $houseNumber: String!) {
    getOrdnanceSurveyAddress(postcode: $postcode, houseNumber: $houseNumber) {
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
