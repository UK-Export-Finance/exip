import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { TOTAL_CONTRACT_VALUE, GBP_CURRENCY_CODE } from '../../../../constants';
import { LINKS } from '../../../links';
import formatCurrency from '../../../../helpers/format-currency';

const MAX_COVER_AMOUNT = formatCurrency(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);

const { BUYER_COUNTRY, HAS_MINIMUM_UK_GOODS_OR_SERVICES } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { WANT_COVER_OVER_MAX_PERIOD, COMPANIES_HOUSE_NUMBER, VALID_EXPORTER_LOCATION } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID } = INSURANCE_FIELD_IDS.ELIGIBILITY;

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
  [WANT_COVER_OVER_MAX_PERIOD]: {
    SUMMARY: {
      TITLE: 'Insured for more than 2 years',
    },
  },
  [COMPANIES_HOUSE_NUMBER]: {
    HINT: `<p>For example, 8989898 or SC907816. You'll find it on your incorporation certificate or on the <a class="govuk-link" href="${LINKS.EXTERNAL.COMPANIES_HOUSE}">Companies House website</a>.</p>`,
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
  [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
    OPTIONS: {
      ABOVE: {
        ID: TOTAL_CONTRACT_VALUE.MORE_THAN_250k.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.MORE_THAN_250k.DB_ID,
        TEXT: `${MAX_COVER_AMOUNT} and above`,
      },
      BELOW: {
        ID: TOTAL_CONTRACT_VALUE.LESS_THAN_250k.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.LESS_THAN_250k.DB_ID,
        TEXT: `Less than ${MAX_COVER_AMOUNT}`,
      },
    },
  },
};
