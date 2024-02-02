import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const { BUYER_FINANCIAL_ACCOUNTS } = FIELD_IDS;

const buyerFinancialInformationPage = {
  details: () => cy.get(`[data-cy="${BUYER_FINANCIAL_ACCOUNTS}-details"]`),
  summary: () => cy.get(`[data-cy="${BUYER_FINANCIAL_ACCOUNTS}-details"] summary`),
  line1: () => cy.get(`[data-cy="${BUYER_FINANCIAL_ACCOUNTS}-details-look-into-buyer"]`),
  line2: () => cy.get(`[data-cy="${BUYER_FINANCIAL_ACCOUNTS}-details-sharing"]`),
  line3: () => cy.get(`[data-cy="${BUYER_FINANCIAL_ACCOUNTS}-details-do-not-have-to-share"]`),
};

export default buyerFinancialInformationPage;
