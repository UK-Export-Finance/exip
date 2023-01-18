import { QUOTE_TITLES } from '../../content-strings';
import { FIELD_IDS, ROUTES } from '../../constants';
import fieldGroupItem from './generate-field-group-item';
import generateSummaryListRows from './generate-summary-list-rows';
import { SummaryListItemData, QuoteContent } from '../../../types';

const { BUYER_COUNTRY, CONTRACT_VALUE, MAX_AMOUNT_OWED, MULTI_POLICY_LENGTH, PERCENTAGE_OF_COVER, POLICY_LENGTH, QUOTE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

const { BUYER_LOCATION, ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

/**
 * generateFields
 * Create all fields for govukSummaryList
 * Add additional fields depending on the submitted answers:
 * - Policy length depending on the Policy type (single/multi)
 * @param {Object} All quote content
 * @returns {Object} All quote values in an object structure for GOVUK summary list structure
 */
const generateFields = (quote: QuoteContent): Array<SummaryListItemData> => {
  let fields = [] as Array<SummaryListItemData>;

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      fieldGroupItem({
        field: { id: CONTRACT_VALUE, title: QUOTE_TITLES[CONTRACT_VALUE] },
        data: quote,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
      }),
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      fieldGroupItem({
        field: { id: MAX_AMOUNT_OWED, title: QUOTE_TITLES[MAX_AMOUNT_OWED] },
        data: quote,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
      }),
    ];
  }

  fields = [
    ...fields,
    fieldGroupItem({
      field: { id: PERCENTAGE_OF_COVER, title: QUOTE_TITLES[PERCENTAGE_OF_COVER] },
      data: quote,
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
    }),
  ];

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      ...fields,
      fieldGroupItem({
        field: { id: INSURED_FOR, title: QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`] },
        data: quote,
      }),
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      ...fields,
      fieldGroupItem({
        field: { id: INSURED_FOR, title: QUOTE_TITLES[`${INSURED_FOR}_MULTI_POLICY`] },
        data: quote,
      }),
    ];
  }

  fields = [
    ...fields,
    fieldGroupItem({
      field: { id: PREMIUM_RATE_PERCENTAGE, title: QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE] },
      data: quote,
    }),
    fieldGroupItem({
      field: { id: ESTIMATED_COST, title: QUOTE_TITLES[ESTIMATED_COST] },
      data: quote,
    }),
  ];

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      ...fields,
      fieldGroupItem({
        field: { id: SINGLE_POLICY_LENGTH, title: QUOTE_TITLES[POLICY_LENGTH] },
        data: quote,
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
      }),
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      ...fields,
      fieldGroupItem({
        field: { id: MULTI_POLICY_LENGTH, title: QUOTE_TITLES[POLICY_LENGTH] },
        data: quote,
      }),
    ];
  }

  fields = [
    ...fields,
    fieldGroupItem({
      field: { id: BUYER_COUNTRY, title: QUOTE_TITLES[BUYER_LOCATION] },
      data: quote,
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
    }),
  ];

  return fields;
};

/**
 * quoteSummaryList
 * Create a group with govukSummaryList data structure
 * @param {Object} All quote content in a simple object.text structure
 * @returns {Object} A group with multiple fields/answers in govukSummaryList data structure
 */
const quoteSummaryList = (quoteContent: QuoteContent) => {
  const fields = generateFields(quoteContent);

  const summaryList = generateSummaryListRows(fields, true);

  return summaryList;
};

export { generateFields, quoteSummaryList };
