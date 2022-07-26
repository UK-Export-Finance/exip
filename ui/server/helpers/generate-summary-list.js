const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CAN_GET_PRIVATE_INSURANCE_YES,
  CAN_GET_PRIVATE_INSURANCE_NO,
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
      CHANGE_ROUTE: ROUTES.BUYER_COUNTRY_CHANGE,
      value: {
        text: answers[BUYER_COUNTRY].text,
      },
    },
    {
      ID: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
      value: {
        text: answers[VALID_COMPANY_BASE].text,
      },
    },
  ];

  if (answers[CAN_GET_PRIVATE_INSURANCE_YES]) {
    fieldGroups.EXPORT_DETAILS = [
      ...fieldGroups.EXPORT_DETAILS,
      {
        ID: CAN_GET_PRIVATE_INSURANCE_YES,
        ...FIELDS[CAN_GET_PRIVATE_INSURANCE_YES],
        CHANGE_ROUTE: ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE,
        value: {
          text: answers[CAN_GET_PRIVATE_INSURANCE_YES].text,
        },
      },
    ];
  }

  if (answers[CAN_GET_PRIVATE_INSURANCE_NO]) {
    fieldGroups.EXPORT_DETAILS = [
      ...fieldGroups.EXPORT_DETAILS,
      {
        ID: CAN_GET_PRIVATE_INSURANCE_NO,
        ...FIELDS[CAN_GET_PRIVATE_INSURANCE_NO],
        CHANGE_ROUTE: ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE,
        value: {
          text: answers[CAN_GET_PRIVATE_INSURANCE_NO].text,
        },
      },
    ];
  }

  fieldGroups.EXPORT_DETAILS = [
    ...fieldGroups.EXPORT_DETAILS,
    {
      ID: UK_GOODS_OR_SERVICES,
      ...FIELDS[UK_GOODS_OR_SERVICES],
      CHANGE_ROUTE: ROUTES.UK_GOODS_OR_SERVICES_CHANGE,
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
        CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
        value: {
          text: answers[SINGLE_POLICY_TYPE].text,
        },
      },
      {
        ID: SINGLE_POLICY_LENGTH,
        ...FIELDS[SINGLE_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
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
        CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
        value: {
          text: answers[MULTI_POLICY_TYPE].text,
        },
      },
      {
        ID: MULTI_POLICY_LENGTH,
        ...FIELDS[MULTI_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.POLICY_TYPE_CHANGE,
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
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
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
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
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
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
      value: {
        text: answers[PERCENTAGE_OF_COVER].text,
      },
    },
  ];

  return fieldGroups;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields) =>
  fields.map((field) => ({
    key: {
      text: FIELDS[field.ID].SUMMARY.TITLE,
      classes: `${field.ID}-key`,
    },
    value: {
      text: field.value.text,
      classes: `${field.ID}-value`,
    },
    actions: {
      items: [
        {
          href: `${field.CHANGE_ROUTE}#${field.ID}`,
          text: LINKS.CHANGE,
          visuallyHiddenText: FIELDS[field.ID].SUMMARY.TITLE,
          attributes: {
            'data-cy': `${field.ID}-change-link`,
          },
        },
      ],
    },
  }));

/*
 * generateSummaryList
 * Create multiple summary lists
 */
const generateSummaryList = (submittedData) => {
  const fieldGroups = generateFieldGroups(submittedData);

  const summaryList = {
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, submittedData),
    },
    POLICY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_POLICY,
      ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS, submittedData),
    },
  };

  return summaryList;
};

module.exports = {
  generateFieldGroups,
  generateSummaryListRows,
  generateSummaryList,
};
