const {
  LINKS,
  QUOTE_TITLES,
} = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');

const {
  AMOUNT,
  BUYER_COUNTRY,
  MULTI_POLICY_LENGTH,
  PERCENTAGE_OF_COVER,
  POLICY_LENGTH,
  QUOTE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

const {
  BUYER_LOCATION,
  ESTIMATED_COST,
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
} = QUOTE;

/*
 * generateFields
 * Create all fields for govukSummaryList
 * Add additional fields depending on the submitted answers:
 * - Policy length depending on the Policy type (single/multi)
 */
const generateFields = (answers) => {
  let fields = [
    {
      id: AMOUNT,
      title: QUOTE_TITLES[INSURED_FOR],
      value: {
        text: answers[AMOUNT].text,
      },
      renderChangeLink: true,
      href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}-label`,
    },
    {
      id: PERCENTAGE_OF_COVER,
      title: QUOTE_TITLES[PERCENTAGE_OF_COVER],
      value: {
        text: answers[PERCENTAGE_OF_COVER].text,
      },
      renderChangeLink: true,
      href: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
    },
    {
      id: PREMIUM_RATE_PERCENTAGE,
      title: QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE],
      value: {
        text: answers[PREMIUM_RATE_PERCENTAGE].text,
      },
    },
    {
      id: ESTIMATED_COST,
      title: QUOTE_TITLES[ESTIMATED_COST],
      value: {
        text: answers[ESTIMATED_COST].text,
      },
    },
  ];

  if (answers[SINGLE_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: FIELD_IDS.SINGLE_POLICY_LENGTH,
        title: QUOTE_TITLES[POLICY_LENGTH],
        value: {
          text: answers[SINGLE_POLICY_LENGTH].text,
        },
        renderChangeLink: true,
        href: `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
      },
    ];
  }

  if (answers[MULTI_POLICY_LENGTH]) {
    fields = [
      ...fields,
      {
        id: FIELD_IDS.MULTI_POLICY_LENGTH,
        title: QUOTE_TITLES[POLICY_LENGTH],
        value: {
          text: answers[MULTI_POLICY_LENGTH].text,
        },
        renderChangeLink: true,
        href: `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`,
      },
    ];
  }

  fields = [
    ...fields,
    {
      id: BUYER_LOCATION,
      title: QUOTE_TITLES[BUYER_LOCATION],
      value: {
        text: answers[BUYER_COUNTRY].text,
      },
      renderChangeLink: true,
      href: `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`,
    },
  ];

  return fields;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields) =>
  fields.map((field) => {
    const mapped = {
      classes: 'ukef-white-text',
      key: {
        text: field.title,
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        classes: `${field.id}-value`,
        text: field.value.text,
      },
      actions: {
        items: [],
      },
    };

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
 * generateQuoteSummaryList
 * Create a summary list
 */
const generateQuoteSummaryList = (answers) => {
  const fields = generateFields(answers);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

module.exports = {
  generateFields,
  generateSummaryListRows,
  generateQuoteSummaryList,
};
