import { LINKS, QUOTE_TITLES } from '../../content-strings';
import { FIELD_IDS, ROUTES } from '../../constants';
import { QuoteContent, SummaryListItemData, SummaryListItem } from '../../../types';

const { BUYER_COUNTRY, CONTRACT_VALUE, MAX_AMOUNT_OWED, MULTI_POLICY_LENGTH, PERCENTAGE_OF_COVER, POLICY_LENGTH, QUOTE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

const { BUYER_LOCATION, ESTIMATED_COST, INSURED_FOR, PREMIUM_RATE_PERCENTAGE } = QUOTE;

/*
 * generateFields
 * Create all fields for govukSummaryList
 * Add additional fields depending on the submitted answers:
 * - Policy length depending on the Policy type (single/multi)
 */
const generateFields = (quote: QuoteContent): Array<SummaryListItemData> => {
  let fields = [] as Array<SummaryListItemData>;

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      {
        id: CONTRACT_VALUE,
        title: QUOTE_TITLES[CONTRACT_VALUE],
        value: {
          text: quote[CONTRACT_VALUE].text,
        },
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
      },
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      {
        id: MAX_AMOUNT_OWED,
        title: QUOTE_TITLES[MAX_AMOUNT_OWED],
        value: {
          text: quote[MAX_AMOUNT_OWED].text,
        },
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
      },
    ];
  }

  fields = [
    ...fields,
    {
      id: PERCENTAGE_OF_COVER,
      title: QUOTE_TITLES[PERCENTAGE_OF_COVER],
      value: {
        text: quote[PERCENTAGE_OF_COVER].text,
      },
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
    },
  ];

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: INSURED_FOR,
        title: QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`],
        value: {
          text: quote[INSURED_FOR].text,
        },
      },
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: INSURED_FOR,
        title: QUOTE_TITLES[`${INSURED_FOR}_MULTI_POLICY`],
        value: {
          text: quote[INSURED_FOR].text,
        },
      },
    ];
  }

  fields = [
    ...fields,
    {
      id: PREMIUM_RATE_PERCENTAGE,
      title: QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE],
      value: {
        text: quote[PREMIUM_RATE_PERCENTAGE].text,
      },
    },
    {
      id: ESTIMATED_COST,
      title: QUOTE_TITLES[ESTIMATED_COST],
      value: {
        text: quote[ESTIMATED_COST].text,
      },
    },
  ];

  if (quote[SINGLE_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: SINGLE_POLICY_LENGTH,
        title: QUOTE_TITLES[POLICY_LENGTH],
        value: {
          text: quote[SINGLE_POLICY_LENGTH].text,
        },
        renderChangeLink: true,
        href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
      },
    ];
  }

  if (quote[MULTI_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: MULTI_POLICY_LENGTH,
        title: QUOTE_TITLES[POLICY_LENGTH],
        value: {
          text: quote[MULTI_POLICY_LENGTH].text,
        },
      },
    ];
  }

  fields = [
    ...fields,
    {
      id: BUYER_LOCATION,
      title: QUOTE_TITLES[BUYER_LOCATION],
      value: {
        text: quote[BUYER_COUNTRY].text,
      },
      renderChangeLink: true,
      href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
    },
  ];

  return fields;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>): Array<SummaryListItem> =>
  fields.map((field: SummaryListItemData): SummaryListItem => {
    const mapped = {
      classes: 'ukef-white-text',
      key: {
        text: field.title,
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        text: field.value.text,
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    } as SummaryListItem;

    if (field.renderChangeLink) {
      mapped.actions.items.push({
        href: field.href,
        text: LINKS.CHANGE,
        visuallyHiddenText: field.title,
        attributes: {
          'data-cy': `${field.id}-change-link`,
        },
        classes: 'ukef-white-text govuk-link--no-visited-state',
      });
    }

    return mapped;
  });

/*
 * quoteSummaryList
 * Create a summary list
 */
const quoteSummaryList = (quoteContent: QuoteContent) => {
  const fields = generateFields(quoteContent);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, generateSummaryListRows, quoteSummaryList };
