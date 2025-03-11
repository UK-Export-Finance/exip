const YOUR_BUYER = {
  COMPANY_OR_ORGANISATION: {
    NAME: 'companyOrOrganisationName',
    ADDRESS: 'address',
    COUNTRY: 'country',
    REGISTRATION_NUMBER: 'registrationNumber',
    WEBSITE: 'website',
  },
  CONNECTION_WITH_BUYER: 'exporterIsConnectedWithBuyer',
  CONNECTION_WITH_BUYER_DESCRIPTION: 'connectionWithBuyerDescription',
  TRADED_WITH_BUYER: 'exporterHasTradedWithBuyer',
  OUTSTANDING_PAYMENTS: 'outstandingPayments',
  TOTAL_OUTSTANDING_PAYMENTS: 'totalOutstandingPayments',
  TOTAL_AMOUNT_OVERDUE: 'totalOverduePayments',
  FAILED_PAYMENTS: 'failedPayments',
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: 'exporterHasPreviousCreditInsuranceWithBuyer',
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: 'previousCreditInsuranceWithBuyerDescription',
  HAS_BUYER_FINANCIAL_ACCOUNTS: 'exporterHasBuyerFinancialAccounts',
} as const;

export default YOUR_BUYER;
