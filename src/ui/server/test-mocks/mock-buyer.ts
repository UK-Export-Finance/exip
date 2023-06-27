import dotenv from 'dotenv';

dotenv.config();

const mockBuyer = {
  companyOrOrganisationName: 'Test name',
  address: 'Address line 1 \r\n Address line 2 \r\n Test town \r\n Test Postcode \r\n United Kingdom',
  country: {
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
  exporterIsConnectedWithBuyer: true,
  exporterHasTradedWithBuyer: true,
};

export default mockBuyer;
