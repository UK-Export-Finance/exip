import dotenv from 'dotenv';
import { GBP } from './mock-currencies';

dotenv.config();

export const mockBuyerRelationship = {
  id: 'clav8by1g0000kgoq5a2afr1b',
  exporterIsConnectedWithBuyer: true,
  connectionWithBuyerDescription: 'Mock connection with buyer description',
  exporterHasPreviousCreditInsuranceWithBuyer: true,
  exporterHasBuyerFinancialAccounts: true,
  previousCreditInsuranceWithBuyerDescription: 'Mock previous credit insurance description',
};

export const mockBuyerTradingHistory = {
  id: 'clav8by1g0000kgoq5a2afr1c',
  currencyCode: GBP.isoCode,
  outstandingPayments: true,
  failedPayments: true,
  exporterHasTradedWithBuyer: true,
  totalOutstandingPayments: 100,
  totalOverduePayments: 200,
};

const mockBuyer = {
  address: 'Test address',
  buyerTradingHistory: mockBuyerTradingHistory,
  companyOrOrganisationName: 'Test name',
  canContactBuyer: true,
  contactFirstName: 'Bob',
  contactLastName: 'Smith',
  contactPosition: 'CEO',
  contactEmail: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  country: {
    id: 'clav8by1g0000kgoq5a2afr1a',
    isoCode: 'GBR',
    name: 'United Kingdom',
  },
  registrationNumber: '1234',
  relationship: mockBuyerRelationship,
  website: 'www.gov.uk',
};

export default mockBuyer;
