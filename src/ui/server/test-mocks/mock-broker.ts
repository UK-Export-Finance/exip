import dotenv from 'dotenv';

dotenv.config();

const mockBroker = {
  isUsingBroker: 'Yes',
  name: 'Test',
  addressLine1: 'Test',
  addressLine2: 'Test',
  town: 'Test',
  county: 'Test',
  postcode: 'SW1A 2HQ',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT,
};

export default mockBroker;
