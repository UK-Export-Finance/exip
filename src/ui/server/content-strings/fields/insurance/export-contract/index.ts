import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
} = INSURANCE_FIELD_IDS;

export const EXPORT_CONTRACT_FIELDS = {
  ABOUT_GOODS_OR_SERVICES: {
    [ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
      LABEL: "Describe the goods or services you want to insure and explain how they'll be used by the buyer",
      HINT: {
        INTRO: 'For example:',
        LIST: [
          'fast moving consumer goods, like vegan protein bars',
          'construction materials to build commercial property',
          'educational services such as teacher training',
        ],
      },
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: "Goods or services you're exporting",
      },
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION_KNOWN]: {
      LABEL: 'Do you know the final destination of the goods or services?',
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
      LABEL: "What's the final destination of the goods or services?",
      SUMMARY: {
        TITLE: 'Final destination of export',
      },
    },
  },
};
