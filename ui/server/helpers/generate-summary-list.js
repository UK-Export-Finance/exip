const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const {
  FIELD_IDS,
  FIELD_GROUPS,
  ROUTES,
} = require('../constants');

/*
 * generateFieldGroups
 * Business rules for field groups.
 * Return the appropriate policy length depending on the policy type
 */
const generateFieldGroups = (submittedData) => {
  const fieldGroups = FIELD_GROUPS;

  if (submittedData[FIELD_IDS.SINGLE_POLICY_LENGTH]) {
    fieldGroups.DEAL_DETAILS.FIELDS.push({
      ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
      ...FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    });
  }

  if (submittedData[FIELD_IDS.MULTI_POLICY_LENGTH]) {
    fieldGroups.DEAL_DETAILS.FIELDS.push({
      ID: FIELD_IDS.MULTI_POLICY_LENGTH,
      ...FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    });
  }

  return fieldGroups;
};

/*
 * generateSummaryListRows
 * Map an array of fields with values in submitted data object
 * for govukSummaryList component
 */
const generateSummaryListRows = (fields, submittedData) =>
  fields.map((field) => ({
    key: {
      text: FIELDS[field.ID].SUMMARY.TITLE,
      classes: `${field.ID}-key`,
    },
    value: {
      text: submittedData[field.ID],
      classes: `${field.ID}-value`,
    },
    actions: {
      items: [
        {
          href: field.CHANGE_ROUTE,
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
      ROWS: generateSummaryListRows(fieldGroups.COMPANY_DETAILS.FIELDS, submittedData),
    },
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS.FIELDS, submittedData),
    },
    DEAL: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
      ROWS: generateSummaryListRows(fieldGroups.DEAL_DETAILS.FIELDS, submittedData),
    },
  };

  return summaryList;
};

module.exports = {
  generateSummaryListRows,
  generateFieldGroups,
  generateSummaryList,
};
