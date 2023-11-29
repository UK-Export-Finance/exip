import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE, GBP_CURRENCY_CODE } from '../../../../constants';
import { LINKS } from '../../../links';
import formatCurrency from '../../../../helpers/format-currency';

const THRESHOLD = formatCurrency(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);

const { BUYER_COUNTRY, HAS_MINIMUM_UK_GOODS_OR_SERVICES } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { COVER_PERIOD: COVER_PERIOD_FIELD_ID, HAS_COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER, VALID_EXPORTER_LOCATION } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID, HAS_END_BUYER } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { COMPANY_NAME } = INSURANCE_FIELD_IDS.COMPANIES_HOUSE;

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
  [HAS_END_BUYER]: {
    HINT: "Sometimes, exporters supply goods to a client in an overseas market who will then sell them on. The exporter will not get paid by the buyer until they have been paid by this third party. We call this third party an 'end buyer'.",
    SUMMARY: {
      TITLE: 'End buyer',
    },
  },
  [COVER_PERIOD_FIELD_ID]: {
    OPTIONS: {
      BELOW: {
        ID: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.LESS_THAN_2_YEARS.VALUE,
      },
      ABOVE: {
        ID: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.MORE_THAN_2_YEARS.VALUE,
      },
    },
    SUMMARY: {
      TITLE: 'Length of policy',
    },
  },
  [COMPANIES_HOUSE_NUMBER]: {
    HINT: `<p>For example, 8989898 or SC907816. You'll find it on your incorporation certificate or on the <a class="govuk-link" href="${LINKS.EXTERNAL.COMPANIES_HOUSE}">Companies House website</a>.</p>`,
    SUMMARY: {
      TITLE: 'UK Companies House number',
    },
  },
  [HAS_COMPANIES_HOUSE_NUMBER]: {
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
  [COMPANY_NAME]: {
    SUMMARY: {
      TITLE: 'Company name',
    },
  },
  [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
    OPTIONS: {
      ABOVE: {
        ID: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        TEXT: `${THRESHOLD} and above`,
      },
      BELOW: {
        ID: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        TEXT: `Less than ${THRESHOLD}`,
      },
    },
    SUMMARY: {
      TITLE: 'Total value to insure',
      ABOVE: `Above ${THRESHOLD}`,
      BELOW: `Below ${THRESHOLD}`,
    },
  },
};
