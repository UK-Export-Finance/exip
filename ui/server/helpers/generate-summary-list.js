const {
  PAGES,
  FIELDS,
  LINKS,
} = require('../content-strings');
const { FIELD_GROUPS } = require('../constants');

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
  const summaryList = {
    COMPANY: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
      ROWS: generateSummaryListRows(FIELD_GROUPS.COMPANY_DETAILS.FIELDS, submittedData),
    },
    EXPORT: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
      ROWS: generateSummaryListRows(FIELD_GROUPS.EXPORT_DETAILS.FIELDS, submittedData),
    },
    DEAL: {
      GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
      ROWS: generateSummaryListRows(FIELD_GROUPS.DEAL_DETAILS.FIELDS, submittedData),
    },
  };

  return summaryList;
};

module.exports = {
  generateSummaryListRows,
  generateSummaryList,
};
