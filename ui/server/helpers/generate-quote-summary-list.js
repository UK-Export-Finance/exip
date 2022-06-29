const {
  LINKS,
  QUOTE_TITLES,
} = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');

const {
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  BUYER_COUNTRY,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const insuredForFieldValue = (value) => {
  const openTag = '<span>';
  const closeTag = '</span>';

  if (value.additionalText) {
    return `${openTag}${value.text}<br><small>${value.additionalText}</small>${closeTag}`;
  }

  return `${openTag}${value.text}${closeTag}`;
};

/*
 * generateFields
 * Create all fields for govukSummaryList
 * Add additional fields depending on the submitted answers:
 * - Policy length depending on the Policy type (single/multi)
 */
const generateFields = (answers) => {
  let fields = [
    {
      id: INSURED_FOR,
      title: QUOTE_TITLES[INSURED_FOR],
      value: {
        html: insuredForFieldValue(answers[INSURED_FOR]),
      },
      renderChangeLink: true,
      changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
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
        changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
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
        changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
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
      changeRoute: ROUTES.BUYER_BASED_CHANGE,
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
      },
      actions: {
        items: [],
      },
    };

    if (field.value.html) {
      mapped.value.html = field.value.html;
    } else {
      mapped.value.text = field.value.text;
    }

    if (field.renderChangeLink) {
      mapped.actions.items.push({
        href: `${field.changeRoute}#${field.id}`,
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
  insuredForFieldValue,
  generateFields,
  generateSummaryListRows,
  generateQuoteSummaryList,
};
