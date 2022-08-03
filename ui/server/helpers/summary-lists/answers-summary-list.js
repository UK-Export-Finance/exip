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
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

/*
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * The following fields depend on the submitted answers and design ordering requirements:
 * - Tried private cover (must have the correct yes/no input ID)
 * - Policy type depending on the Policy type (must have single/multi input ID)
 * - Policy length depending on the Policy type (must have single/multi input ID)
 * - Contract value or Max contract value depending on the Policy type
 * - Credit period if Policy type is multi
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
      ID: HAS_MINIMUM_UK_GOODS_OR_SERVICES,
      ...FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
      HREF: `${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}#heading`,
      value: {
        text: answers[HAS_MINIMUM_UK_GOODS_OR_SERVICES].text,
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
      {
        ID: CONTRACT_VALUE,
        ...FIELDS[CONTRACT_VALUE],
        HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
        value: {
          text: answers[CONTRACT_VALUE].text,
        },
      },
      {
        ID: PERCENTAGE_OF_COVER,
        ...FIELDS[PERCENTAGE_OF_COVER],
        HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        value: {
          text: answers[PERCENTAGE_OF_COVER].text,
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
      {
        ID: MAX_AMOUNT_OWED,
        ...FIELDS[MAX_AMOUNT_OWED],
        HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
        value: {
          text: answers[MAX_AMOUNT_OWED].text,
        },
      },
      {
        ID: PERCENTAGE_OF_COVER,
        ...FIELDS[PERCENTAGE_OF_COVER],
        HREF: `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        value: {
          text: answers[PERCENTAGE_OF_COVER].text,
        },
      },
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

  return fieldGroups;
};

/*
 * getKeyText
 * Get the summary text to display in a key
 * for govukSummaryList component
 */
const getKeyText = (fieldId) => FIELDS[fieldId].SUMMARY.TITLE;

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
