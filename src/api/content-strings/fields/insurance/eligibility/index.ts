import FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.ELIGIBILITY;

export const FIELDS_ELIGIBILITY = {
  [BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer location',
    },
  },
  [VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: 'In UK, Channel Islands or Isle of Man',
    },
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
    ANSWER: 'At least 20%',
  },
  [WANT_COVER_OVER_MAX_AMOUNT]: {
    SUMMARY: {
      TITLE: 'Insured for more than £500,000',
    },
  },
  [WANT_COVER_OVER_MAX_PERIOD]: {
    SUMMARY: {
      TITLE: 'Insured for more than 2 years',
    },
  },
  [OTHER_PARTIES_INVOLVED]: {
    SUMMARY: {
      TITLE: 'Other parties involved',
    },
  },
  [LETTER_OF_CREDIT]: {
    SUMMARY: {
      TITLE: 'Paid by letter of credit',
    },
  },
  [PRE_CREDIT_PERIOD]: {
    SUMMARY: {
      TITLE: 'Pre-credit period',
    },
  },
  [COMPANIES_HOUSE_NUMBER]: {
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
};
