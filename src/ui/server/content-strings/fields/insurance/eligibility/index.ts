import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { LINKS } from '../../../links';

const { BUYER_COUNTRY, HAS_MINIMUM_UK_GOODS_OR_SERVICES, WANT_COVER_OVER_MAX_AMOUNT } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const { WANT_COVER_OVER_MAX_PERIOD, COMPANIES_HOUSE_NUMBER, VALID_EXPORTER_LOCATION } = INSURANCE_FIELD_IDS.ELIGIBILITY;

// TODO: rename COMPANY_HOUSE to COMPANIES_HOUSE

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
  [COMPANIES_HOUSE_NUMBER]: {
    HINT: `<p>For example, 8989898 or SC907816. You'll find it on your incorporation certificate or on the <a class="govuk-link" href="${LINKS.EXTERNAL.COMPANIES_HOUSE}">Companies House website</a>.</p>`,
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
};
