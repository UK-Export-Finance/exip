import dotenv from 'dotenv';
import { GBP } from './mock-currencies';

dotenv.config();

export const mockConnectionWithBuyer = {
  exporterIsConnectedWithBuyer: true,
  connectionWithBuyerDescription: 'test description',
};

export const mockBuyerTradingHistory = {
  id: 'clacdgc630000kdoqn7wcgre81',
  exporterHasTradedWithBuyer: true,
  outstandingPayments: true,
  failedPayments: true,
  currencyCode: GBP.isoCode,
};

export const mockBuyerRelationship = {
  id: 'clacdgc630000kdoqn7wcgre8t',
  ...mockConnectionWithBuyer,
  exporterHasPreviousCreditInsuranceWithBuyer: true,
  exporterHasBuyerFinancialAccounts: true,
  previousCreditInsuranceWithBuyerDescription: 'mock credit insurance buyer',
};

export const mockBuyerContact = {
  id: 'clacdgc630000kdoqn7wcgre8e',
  contactFirstName: 'Bob',
  contactLastName: 'Smith',
  contactPosition: 'CEO',
  contactEmail: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  canContactBuyer: true,
};

const mockBuyer = {
  companyOrOrganisationName: 'Test name',
  address: 'Address line 1 \r\n Address line 2 \r\n Test town \r\n Test Postcode \r\n United Kingdom',
  country: {
    isoCode: 'GBR',
    name: 'United Kingdom',
  },
  registrationNumber: '1234',
  website: 'www.gov.uk',
  buyerTradingHistory: mockBuyerTradingHistory,
  contact: mockBuyerContact,
  relationship: mockBuyerRelationship,
};

export default mockBuyer;
