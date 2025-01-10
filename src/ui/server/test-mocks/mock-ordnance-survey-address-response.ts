const mockOrdnanceSurveyAddressResponse = {
  success: true,
  noAddressesFound: false,
  invalidPostcode: false,
  addresses: [
    {
      __typename: 'typename',
      addressLine1: 'Mock address 1, line 1',
      addressLine2: 'Mock address 1, line 2',
      town: 'Mock address 1, town',
      postalCode: 'Mock address 1, post code',
    },
    {
      __typename: 'typename',
      addressLine1: 'Mock address 2, line 1',
      addressLine2: 'Mock address 2, line 2',
      town: 'Mock address 2, town',
      postalCode: 'Mock address 2, post code',
    },
  ],
};

export default mockOrdnanceSurveyAddressResponse;
