import { EXPORT_CONTRACT_AWARD_METHOD, FIELD_VALUES, MAXIMUM_CHARACTERS } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { FORM_TITLES } from '../../../form-titles';

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = EXPORT_CONTRACT_AWARD_METHOD;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
    PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
    USING_AGENT,
    AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
    AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
    AGENT_CHARGES: { METHOD, FIXED_SUM, PERCENTAGE, PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, PAYABLE_COUNTRY_CODE },
  },
} = INSURANCE_FIELD_IDS;

const { EXPORT_CONTRACT: EXPORT_CONTRACT_FORM_TITLES } = FORM_TITLES;

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
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.ABOUT_THE_EXPORT,
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
    [ATTEMPTED]: {
      SUMMARY: {
        TITLE: 'Approached private market',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.PRIVATE_MARKET,
      },
    },
    [DECLINED_DESCRIPTION]: {
      HINT: "Tell us about the best quote you received and why you were unable to use it. For example, your current policy might not cover the country you're exporting to.",
      MAXIMUM: MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION,
      SUMMARY: {
        TITLE: 'Reason(s) unable to obtain cover',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.PRIVATE_MARKET,
      },
    },
  },
  [USING_AGENT]: {
    SUMMARY: {
      TITLE: 'Using an agent',
      FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
    },
  },
  AGENT_DETAILS: {
    [NAME]: {
      LABEL: 'Name of the agent',
      SUMMARY: {
        TITLE: 'Agent name',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [FULL_ADDRESS]: {
      LABEL: 'Address of the agent',
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
      SUMMARY: {
        TITLE: 'Agent address',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [COUNTRY_CODE]: {
      LABEL: 'Country the agent is based in',
      SUMMARY: {
        TITLE: 'Country the agent is based in',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
  },
  AGENT_SERVICE: {
    [IS_CHARGING]: {
      LABEL: 'Is the agent charging for their support in the export contract?',
      SUMMARY: {
        TITLE: 'Agent charging for support',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [SERVICE_DESCRIPTION]: {
      LABEL: 'Service the agent is providing',
      MAXIMUM: MAXIMUM_CHARACTERS.AGENT_SERVICE_DESCRIPTION,
      SUMMARY: {
        TITLE: 'Service the agent is providing',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
  },
  AGENT_CHARGES: {
    [METHOD]: {
      LABEL: 'How is the agent charging you?',
      OPTIONS: {
        FIXED_SUM: {
          ID: FIXED_SUM,
          VALUE: FIELD_VALUES.EXPORT_CONTRACT.AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM,
          TEXT: FIELD_VALUES.EXPORT_CONTRACT.AGENT_SERVICE_CHARGE_METHOD.FIXED_SUM,
        },
        PERCENTAGE: {
          ID: PERCENTAGE,
          VALUE: FIELD_VALUES.EXPORT_CONTRACT.AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE,
          TEXT: FIELD_VALUES.EXPORT_CONTRACT.AGENT_SERVICE_CHARGE_METHOD.PERCENTAGE,
        },
      },
    },
    [FIXED_SUM_AMOUNT]: {
      LABEL: 'How much are they charging in',
      SUMMARY: {
        TITLE: 'How much they are charging',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [PERCENTAGE_CHARGE]: {
      LABEL: 'What percentage are they charging?',
      SUFFIX: '%',
      SUMMARY: {
        TITLE: 'How much they are charging',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [PAYABLE_COUNTRY_CODE]: {
      LABEL: 'Country where charges are payable',
      SUMMARY: {
        TITLE: 'Country that commission is payable',
        FORM_TITLE: EXPORT_CONTRACT_FORM_TITLES.AGENT,
      },
    },
    [CURRENCY_CODE]: {
      LEGEND: 'What currency is the agent charging you in?',
    },
  },
};
