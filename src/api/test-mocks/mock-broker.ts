import dotenv from 'dotenv';
import { ANSWERS } from '../constants';

dotenv.config();

const mockBroker = {
  isUsingBroker: ANSWERS.YES,
  name: 'Test',
  addressLine1: 'Test',
  addressLine2: 'Test',
  town: 'Test',
  county: 'Test',
  postcode: 'SW1A 2HQ',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
};

export default mockBroker;
