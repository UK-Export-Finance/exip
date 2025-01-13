import dotenv from 'dotenv';

dotenv.config();

const mockBroker = {
  isUsingBroker: true,
  name: 'Mock broker name',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  fullAddress: 'Mock broker address',
  buildingNumberOrName: 'Mock broker building name/number',
  addressLine1: 'Mock broker address line 1',
  addressLine2: 'Mock broker address line 2',
  town: 'Mock broker town',
  county: 'Mock broker county',
  postcode: 'Mock broker postcode',
};

export default mockBroker;
