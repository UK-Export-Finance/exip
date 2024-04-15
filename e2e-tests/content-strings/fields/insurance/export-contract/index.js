import { FIELD_VALUES, MAXIMUM_CHARACTERS } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { FORM_TITLES } from '../../../form-titles';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE },
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
      OPTIONS: FIELD_VALUES.CHARGE_METHODS,
    },
    [PAYABLE_COUNTRY_CODE]: {
      LABEL: 'Country where charges are payable',
    },
  },
};

export default EXPORT_CONTRACT_FIELDS;
