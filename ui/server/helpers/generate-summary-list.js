const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_GROUPS,
  FIELD_IDS,
  ROUTES,
} = require('../constants');

const {
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const {
  COMPANY_DETAILS,
  EXPORT_DETAILS,
  DEAL_DETAILS,
} = FIELD_GROUPS;

/*
 * generateFieldGroups
 * Create all field groups for govukSummaryList
 * Add a Policy Length field depending on the Policy type (single/multi)
 * Policy length field must return the correct single/multi input ID.
 */
const generateFieldGroups = (submittedData) => {
  const fieldGroups = { ...FIELD_GROUPS };

  fieldGroups.COMPANY_DETAILS = COMPANY_DETAILS.map((field) => ({
    ...field,
    value: submittedData[field.ID],
  }));

  fieldGroups.EXPORT_DETAILS = EXPORT_DETAILS.map((field) => ({
    ...field,
    value: submittedData[field.ID],
  }));

  fieldGroups.DEAL_DETAILS = DEAL_DETAILS.map((field) => ({
    ...field,
    value: submittedData[field.ID],
  }));

  if (submittedData[SINGLE_POLICY_TYPE]) {
    fieldGroups.DEAL_DETAILS = [
      ...fieldGroups.DEAL_DETAILS,
      {
        ID: SINGLE_POLICY_TYPE,
        ...FIELDS[SINGLE_POLICY_TYPE],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        value: submittedData[SINGLE_POLICY_TYPE],
      },
      {
        ID: SINGLE_POLICY_LENGTH,
        ...FIELDS[SINGLE_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        value: submittedData[SINGLE_POLICY_LENGTH],
      },
    ];
  }

  if (submittedData[MULTI_POLICY_TYPE]) {
    fieldGroups.DEAL_DETAILS = [
      ...fieldGroups.DEAL_DETAILS,
      {
        ID: MULTI_POLICY_TYPE,
        ...FIELDS[MULTI_POLICY_TYPE],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        value: submittedData[MULTI_POLICY_TYPE],
      },
      {
        ID: MULTI_POLICY_LENGTH,
        ...FIELDS[MULTI_POLICY_LENGTH],
        CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        value: submittedData[MULTI_POLICY_LENGTH],
      },
    ];
  }

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
      text: field.value,
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
    COMPANY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
      ROWS: generateSummaryListRows(fieldGroups.COMPANY_DETAILS, submittedData),
    },
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, submittedData),
    },
    DEAL: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
      ROWS: generateSummaryListRows(fieldGroups.DEAL_DETAILS, submittedData),
    },
  };

  return summaryList;
};

module.exports = {
  generateFieldGroups,
  generateSummaryListRows,
  generateSummaryList,
};
