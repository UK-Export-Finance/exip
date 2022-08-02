const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../../constants');
const {
  isSinglePolicyType,
  isMultiPolicyType,
} = require('../policy-type');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

/*
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * The following fields depend on the submitted answers and design ordering requirements:
 * - Tried private cover (must have the correct yes/no input ID)
 * - Policy type depending on the Policy type (must have single/multi input ID)
 * - Policy length depending on the Policy type (must have single/multi input ID)
 */
const generateFieldGroups = (answers) => {
  const fieldGroups = {
    EXPORT_DETAILS: [],
    POLICY_DETAILS: [],
  };

  fieldGroups.EXPORT_DETAILS = [
    {
      ID: BUYER_COUNTRY,
      ...FIELDS[BUYER_COUNTRY],
      HREF: `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`,
      value: {
        text: answers[BUYER_COUNTRY].text,
      },
    },
    {
      ID: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      HREF: `${ROUTES.COMPANY_BASED_CHANGE}#heading`,
      value: {
        text: answers[VALID_COMPANY_BASE].text,
      },
    },
    {
      ID: UK_GOODS_OR_SERVICES,
      ...FIELDS[UK_GOODS_OR_SERVICES],
      HREF: `${ROUTES.UK_GOODS_OR_SERVICES_CHANGE}#heading`,
      value: {
        text: answers[UK_GOODS_OR_SERVICES].text,
      },
    },
  ];

  if (answers[SINGLE_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      {
        ID: SINGLE_POLICY_TYPE,
        ...FIELDS[SINGLE_POLICY_TYPE],
        HREF: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
        value: {
          text: answers[SINGLE_POLICY_TYPE].text,
        },
      },
      {
        ID: SINGLE_POLICY_LENGTH,
        ...FIELDS[SINGLE_POLICY_LENGTH],
        HREF: `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
        value: {
          text: answers[SINGLE_POLICY_LENGTH].text,
        },
      },
    ];
  }

  if (answers[MULTI_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      {
        ID: MULTI_POLICY_TYPE,
        ...FIELDS[MULTI_POLICY_TYPE],
        HREF: `${ROUTES.POLICY_TYPE_CHANGE}#heading`,
        value: {
          text: answers[MULTI_POLICY_TYPE].text,
        },
      },
      {
        ID: MULTI_POLICY_LENGTH,
        ...FIELDS[MULTI_POLICY_LENGTH],
        HREF: `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`,
        value: {
          text: answers[MULTI_POLICY_LENGTH].text,
        },
      },
    ];
  }

  fieldGroups.POLICY_DETAILS = [
    ...fieldGroups.POLICY_DETAILS,
    {
      ID: AMOUNT,
      ...FIELDS[AMOUNT],
      HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}-label`,
      value: {
        text: answers[AMOUNT].text,
      },
    },
  ];

  if (answers[MULTI_POLICY_TYPE]) {
    fieldGroups.POLICY_DETAILS = [
      ...fieldGroups.POLICY_DETAILS,
      {
        ID: CREDIT_PERIOD,
        ...FIELDS[CREDIT_PERIOD],
        HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
        value: {
          text: answers[CREDIT_PERIOD].text,
        },
      },
    ];
  }

  fieldGroups.POLICY_DETAILS = [
    ...fieldGroups.POLICY_DETAILS,
    {
      ID: PERCENTAGE_OF_COVER,
      ...FIELDS[PERCENTAGE_OF_COVER],
      HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
      value: {
        text: answers[PERCENTAGE_OF_COVER].text,
      },
    },
  ];

  return fieldGroups;
};

/*
 * getKeyText
 * Get the text to display in a key
 * Depends on the field structure, design and policy type
 * Some fields have different text depending on the policy type
 * for govukSummaryList component
 */
const getKeyText = (fieldId, policyType) => {
  const field = FIELDS[fieldId];

  if (field.SINGLE_POLICY && field.MULTI_POLICY) {
    if (isSinglePolicyType(policyType) && field.SINGLE_POLICY.SUMMARY) {
      return field.SINGLE_POLICY.SUMMARY.TITLE;
    }

    if (isMultiPolicyType(policyType) && field.MULTI_POLICY.SUMMARY) {
      return field.MULTI_POLICY.SUMMARY.TITLE;
    }
  }

  return FIELDS[fieldId].SUMMARY.TITLE;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields, policyType) =>
  fields.map((field) => ({
    key: {
      text: getKeyText(field.ID, policyType),
      classes: `${field.ID}-key`,
    },
    value: {
      text: field.value.text,
      classes: `${field.ID}-value`,
    },
    actions: {
      items: [
        {
          href: field.HREF,
          text: LINKS.CHANGE,
          visuallyHiddenText: getKeyText(field.ID, policyType),
          attributes: {
            'data-cy': `${field.ID}-change-link`,
          },
        },
      ],
    },
  }));

/*
 * answersSummaryList
 * Create multiple summary lists
 */
const answersSummaryList = (submittedData, policyType) => {
  const fieldGroups = generateFieldGroups(submittedData);

  const summaryList = {
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, policyType),
    },
    POLICY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
      ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS, policyType),
    },
  };

  return summaryList;
};

module.exports = {
  generateFieldGroups,
  getKeyText,
  generateSummaryListRows,
  answersSummaryList,
};
