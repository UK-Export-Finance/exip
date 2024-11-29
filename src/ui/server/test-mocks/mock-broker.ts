import dotenv from 'dotenv';

dotenv.config();

const mockBroker = {
  isUsingBroker: true,
  name: 'Mock broker name',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  fullAddress: 'Mock broker address',
  isBasedInUk: false,
  postcode: 'W1A 1AA',
  buildingNumberOrName: 'WOGAN HOUSE',
};

export default mockBroker;
