import dotenv from 'dotenv';
import { ExporterBroker } from '../../types';

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
} as ExporterBroker;

export default mockBroker;
