import { MAXIMUM_CHARACTERS } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { FORM_TITLES } from '../../../form-titles';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = FIELD_IDS;

const { EXPORT_CONTRACT: EXPORT_CONTRACT_FORM_TITLES } = FORM_TITLES;

export const EXPORT_CONTRACT_FIELDS = {
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
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.ABOUT_THE_EXPORT,
      },
    },
    [FINAL_DESTINATION_KNOWN]: {
      LABEL: 'Do you know the final destination of the goods or services?',
    },
    [FINAL_DESTINATION]: {
      LABEL: "What's the final destination of the goods or services?",
      SUMMARY: {
        TITLE: 'Final destination of goods or services',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.ABOUT_THE_EXPORT,
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
      MAXIMUM: MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION,
      SUMMARY: {
        TITLE: "How you'll be paid",
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.ABOUT_THE_EXPORT,
      },
    },
  },
  PRIVATE_MARKET: {
    [DECLINED_DESCRIPTION]: {
      HINT: "Tell us about the best quote you received and why you were unable to use it. For example, your current policy might not cover the country you're exporting to.",
      MAXIMUM: MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION,
    },
  },
};
