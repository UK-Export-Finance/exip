import dotenv from 'dotenv';

dotenv.config();

const mockBroker = {
  isUsingBroker: true,
  name: 'Mock broker name',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  fullAddress: 'Mock broker address',
};

export default mockBroker;
