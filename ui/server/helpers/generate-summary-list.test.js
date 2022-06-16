const {
  generateSummaryListRows,
  generateFieldGroups,
  generateSummaryList,
} = require('./generate-summary-list');
const {
  FIELDS,
  LINKS,
  PAGES,
} = require('../content-strings');
const {
  FIELD_IDS,
  FIELD_GROUPS,
  ROUTES,
} = require('../constants');
const { mockAnswers } = require('../test-mocks');

describe('sever/helpers/generate-summary-list', () => {
  const mockFields = [
    {
      ID: FIELD_IDS.VALID_COMPANY_BASE,
      ...FIELDS[FIELD_IDS.VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ];

  let mockSubmittedData = {
    [FIELD_IDS.VALID_COMPANY_BASE]: true,
  };

  const fieldGroups = generateFieldGroups(mockAnswers);

  describe('generateFieldGroups', () => {
    describe(`when submitted data has ${FIELD_IDS.SINGLE_POLICY_LENGTH}`, () => {
      it('should add `single policy length` to the `deal details` field groups', () => {
        mockSubmittedData = {
          [FIELD_IDS.SINGLE_POLICY_LENGTH]: 'mock',
        };

        const result = generateFieldGroups(mockSubmittedData);

        const lastGroup = result.DEAL_DETAILS.FIELDS[result.DEAL_DETAILS.FIELDS.length - 1];

        const expected = {
          ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
          ...FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(lastGroup).toEqual(expected);
      });
    });

    describe(`when submitted data has ${FIELD_IDS.MULTI_POLICY_LENGTH}`, () => {
      it('should return single policy length field', () => {
        mockSubmittedData = {
          [FIELD_IDS.MULTI_POLICY_LENGTH]: 'mock',
        };

        const result = generateFieldGroups(mockSubmittedData);

        const lastGroup = result.DEAL_DETAILS.FIELDS[result.DEAL_DETAILS.FIELDS.length - 1];

        const expected = {
          ID: FIELD_IDS.MULTI_POLICY_LENGTH,
          ...FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(lastGroup).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const result = generateSummaryListRows(
        fieldGroups.COMPANY_DETAILS.FIELDS,
        mockSubmittedData,
      );

      const expectedObj = (field) => ({
        key: {
          text: FIELDS[field.ID].SUMMARY.TITLE,
          classes: `${field.ID}-key`,
        },
        value: {
          text: mockAnswers[field.ID],
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
      });

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(mockFields[0]);
      expect(result[0]).toEqual(expected);
    });
  });

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const result = generateSummaryList(mockAnswers);

      const expected = {
        COMPANY: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_COMPANY,
          ROWS: generateSummaryListRows(FIELD_GROUPS.COMPANY_DETAILS.FIELDS, mockAnswers),
        },
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(FIELD_GROUPS.EXPORT_DETAILS.FIELDS, mockAnswers),
        },
        DEAL: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
          ROWS: generateSummaryListRows(FIELD_GROUPS.DEAL_DETAILS.FIELDS, mockAnswers),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
