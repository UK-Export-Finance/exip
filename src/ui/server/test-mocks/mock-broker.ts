import dotenv from 'dotenv';

dotenv.config();

const mockBroker = {
  isUsingBroker: true,
  name: 'Mock broker name',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  fullAddress: 'Mock full broker address',
  isBasedInUk: false,
  postcode: 'W1A 1AA',
  buildingNumberOrName: 'Treasury',
  addressLine1: 'Mock broker address line 1',
  addressLine2: 'Mock broker address line 2',
  town: 'Mock broker town',
  county: 'Mock broker county',
};

export default mockBroker;
