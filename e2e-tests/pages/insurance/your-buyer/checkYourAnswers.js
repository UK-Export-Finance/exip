import { FIELD_IDS } from '../../../constants';

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        NAME,
        ADDRESS,
        REGISTRATION_NUMBER,
        WEBSITE,
        FIRST_NAME,
        CAN_CONTACT_BUYER,
      },
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const checkYourAnswers = {
  summaryList: {
    [NAME]: {
      key: () => cy.get(`.${NAME}-key`),
      value: () => cy.get(`.${NAME}-value`),
      changeLink: () => cy.get(`[data-cy="${NAME}-change-link"]`),
    },
    [ADDRESS]: {
      key: () => cy.get(`.${ADDRESS}-key`),
      value: () => cy.get(`.${ADDRESS}-value`),
      changeLink: () => cy.get(`[data-cy="${ADDRESS}-change-link"]`),
    },
    [REGISTRATION_NUMBER]: {
      key: () => cy.get(`.${REGISTRATION_NUMBER}-key`),
      value: () => cy.get(`.${REGISTRATION_NUMBER}-value`),
      changeLink: () => cy.get(`[data-cy="${REGISTRATION_NUMBER}-change-link"]`),
    },
    [WEBSITE]: {
      key: () => cy.get(`.${WEBSITE}-key`),
      value: () => cy.get(`.${WEBSITE}-value`),
      changeLink: () => cy.get(`[data-cy="${WEBSITE}-change-link"]`),
    },
    [FIRST_NAME]: {
      key: () => cy.get(`.${FIRST_NAME}-key`),
      value: () => cy.get(`.${FIRST_NAME}-value`),
      changeLink: () => cy.get(`[data-cy="${FIRST_NAME}-change-link"]`),
    },
    [CAN_CONTACT_BUYER]: {
      key: () => cy.get(`.${CAN_CONTACT_BUYER}-key`),
      value: () => cy.get(`.${CAN_CONTACT_BUYER}-value`),
      changeLink: () => cy.get(`[data-cy="${CAN_CONTACT_BUYER}-change-link"]`),
    },
    [CONNECTED_WITH_BUYER]: {
      key: () => cy.get(`.${CONNECTED_WITH_BUYER}-key`),
      value: () => cy.get(`.${CONNECTED_WITH_BUYER}-value`),
      changeLink: () => cy.get(`[data-cy="${CONNECTED_WITH_BUYER}-change-link"]`),
    },
    [TRADED_WITH_BUYER]: {
      key: () => cy.get(`.${TRADED_WITH_BUYER}-key`),
      value: () => cy.get(`.${TRADED_WITH_BUYER}-value`),
      changeLink: () => cy.get(`[data-cy="${TRADED_WITH_BUYER}-change-link"]`),
    },
  },
};

export default checkYourAnswers;
