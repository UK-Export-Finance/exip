import { FIELD_IDS } from '../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NAME,
      COMPANY_ADDRESS,
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      COMPANY_SIC,
    },
  },
} = FIELD_IDS.INSURANCE;

const yourBusinessSummaryList = {
  [COMPANY_NUMBER]: {
    key: () => cy.get(`.${COMPANY_NUMBER}-key`),
    value: () => cy.get(`.${COMPANY_NUMBER}-value`),
  },
  [COMPANY_NAME]: {
    key: () => cy.get(`.${COMPANY_NAME}-key`),
    value: () => cy.get(`.${COMPANY_NAME}-value`),
  },
  [COMPANY_ADDRESS]: {
    key: () => cy.get(`.${COMPANY_ADDRESS}-key`),
    value: () => cy.get(`.${COMPANY_ADDRESS}-value`),
  },
  [COMPANY_INCORPORATED]: {
    key: () => cy.get(`.${COMPANY_INCORPORATED}-key`),
    value: () => cy.get(`.${COMPANY_INCORPORATED}-value`),
  },
  [COMPANY_SIC]: {
    key: () => cy.get(`.${COMPANY_SIC}-key`),
    value: () => cy.get(`.${COMPANY_SIC}-value`),
  },
};

export default yourBusinessSummaryList;
