import dotenv from 'dotenv';
import { ANSWERS } from '../constants';

dotenv.config();

const mockBuyer = {
  companyOrOrganisationName: 'Test name',
  address: 'Test address',
  country: {
    id: 'clav8by1g0000kgoq5a2afr1a',
    isoCode: 'GBR',
    name: 'United Kingdom',
  },
  registrationNumber: '1234',
  website: 'www.gov.uk',
  contactFirstName: 'Bob',
  contactLastName: 'Smith',
  contactPosition: 'CEO',
  contactEmail: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  canContactBuyer: true,
  exporterIsConnectedWithBuyer: ANSWERS.YES,
  exporterHasTradedWithBuyer: ANSWERS.YES,
};

export default mockBuyer;
