import { EXPORT_CONTRACT_AWARD_METHOD, MAXIMUM_CHARACTERS } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = EXPORT_CONTRACT_AWARD_METHOD;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = FIELD_IDS;

export const EXPORT_CONTRACT_FIELDS = {
  HOW_WAS_THE_CONTRACT_AWARDED: {
    [AWARD_METHOD]: {
      LEGEND: 'How was the contract awarded?',
      OPTIONS: {
        OPEN_TENDER: {
          ID: OPEN_TENDER.DB_ID,
          VALUE: OPEN_TENDER.DB_ID,
          TEXT: OPEN_TENDER.VALUE,
        },
        NEGOTIATED_CONTRACT: {
          ID: NEGOTIATED_CONTRACT.DB_ID,
          VALUE: NEGOTIATED_CONTRACT.DB_ID,
          TEXT: NEGOTIATED_CONTRACT.VALUE,
        },
        DIRECT_AWARD: {
          ID: DIRECT_AWARD.DB_ID,
          VALUE: DIRECT_AWARD.DB_ID,
          TEXT: DIRECT_AWARD.VALUE,
        },
        COMPETITIVE_BIDDING: {
          ID: COMPETITIVE_BIDDING.DB_ID,
          VALUE: COMPETITIVE_BIDDING.DB_ID,
          TEXT: COMPETITIVE_BIDDING.VALUE,
        },
        OTHER: {
          ID: OTHER.DB_ID,
          VALUE: OTHER.DB_ID,
          TEXT: OTHER.VALUE,
        },
      },
      SUMMARY: {
        TITLE: 'How was the contract awarded',
      },
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    [DESCRIPTION]: {
      LABEL: "Describe the goods or services you're exporting and explain how they'll be used by the buyer",
      HINT: {
        INTRO: 'For example:',
        LIST: [
          'fast moving consumer goods, like vegan protein bars',
          'construction materials to build commercial property',
          'educational services such as teacher training',
        ],
        OUTRO: "We may contact you to get more information if you're exporting goods or services that might have an impact on the environment.",
      },
      MAXIMUM: MAXIMUM_CHARACTERS.ABOUT_GOODS_OR_SERVICES_DESCRIPTION,
      SUMMARY: {
        TITLE: "Goods or services you're exporting",
      },
    },
    [FINAL_DESTINATION_KNOWN]: {
      LABEL: 'Do you know the final destination of the goods or services?',
    },
    [FINAL_DESTINATION]: {
      LABEL: "What's the final destination of the goods or services?",
      SUMMARY: {
        TITLE: 'Final destination of goods or services',
      },
    },
  },
  HOW_WILL_YOU_GET_PAID: {
    [PAYMENT_TERMS_DESCRIPTION]: {
      HINT: {
        INTRO: 'Types of payment terms include:',
        LIST: ['payments that are due within 60 days from date of invoice', 'payments collected by a letter of credit', 'staged payments'],
        OUTRO: "If you use staged payments, explain their structure and whether they're monthly, in advance or something else.",
      },
    },
  },
  PRIVATE_MARKET: {
    [DECLINED_DESCRIPTION]: {
      HINT: "Tell us about the best quote you received and why you were unable to use it. For example, your current policy might not cover the country you're exporting to.",
    },
  },
};
