const {
  generateFieldGroups,
  generateSummaryListRows,
  generateSummaryList,
} = require('./generate-summary-list');
const { mapAnswersToContent } = require('./data-content-mappings/map-answers-to-content');
const {
  PAGES,
  FIELDS,
  LINKS,
  SUMMARY_ANSWERS,
} = require('../content-strings');
const {
  FIELD_GROUPS,
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = require('../constants');
const { mockAnswers } = require('../test-mocks');

const {
  TRIED_PRIVATE_COVER_YES,
  TRIED_PRIVATE_COVER_NO,
  UK_CONTENT_PERCENTAGE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  CREDIT_PERIOD,
} = FIELD_IDS;

describe('sever/helpers/generate-summary-list', () => {
  const mockFields = [
    {
      ID: FIELD_IDS.BUYER_COUNTRY,
      ...FIELDS[FIELD_IDS.BUYER_COUNTRY],
      CHANGE_ROUTE: ROUTES.BUYER_BASED_CHANGE,
    },
  ];

  describe('generateFieldGroups', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockAnswersContent = mapAnswersToContent(mockAnswers);
      delete mockAnswersContent[TRIED_PRIVATE_COVER_NO];
      delete mockAnswersContent[SINGLE_POLICY_TYPE];
      delete mockAnswersContent[SINGLE_POLICY_LENGTH];

      const result = generateFieldGroups(mockAnswersContent);
      const fieldGroups = FIELD_GROUPS;

      const expected = {
        EXPORT_DETAILS: fieldGroups.EXPORT_DETAILS.map((field) => ({
          ...field,
          value: {
            text: mockAnswersContent[field.ID].text,
          },
        })),
        DEAL_DETAILS: fieldGroups.DEAL_DETAILS.map((field) => ({
          ...field,
          value: {
            text: mockAnswersContent[field.ID].text,
          },
        })),
      };

      // UK_CONTENT_PERCENTAGE is dynamically added after a previous field.
      expected.EXPORT_DETAILS = [
        ...expected.EXPORT_DETAILS,
        {
          ID: UK_CONTENT_PERCENTAGE,
          ...FIELDS[UK_CONTENT_PERCENTAGE],
          CHANGE_ROUTE: ROUTES.UK_CONTENT_PERCENTAGE_CHANGE,
          value: {
            text: mockAnswersContent[UK_CONTENT_PERCENTAGE].text,
          },
        },
      ];

      // CREDIT_PERIOD is dynamically added after a previous field.
      expected.DEAL_DETAILS = [
        ...expected.DEAL_DETAILS,
        {
          ID: CREDIT_PERIOD,
          ...FIELDS[CREDIT_PERIOD],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[CREDIT_PERIOD].text,
          },
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when `unable to get private cover` is true', () => {
      it(`should add a ${TRIED_PRIVATE_COVER_YES} object to EXPORT_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [TRIED_PRIVATE_COVER_YES]: {
            text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_YES],
          },
        };
        delete mockAnswersContent[TRIED_PRIVATE_COVER_NO];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.EXPORT_DETAILS[result.EXPORT_DETAILS.length - 2];

        const expected = {
          ID: TRIED_PRIVATE_COVER_YES,
          ...FIELDS[TRIED_PRIVATE_COVER_YES],
          CHANGE_ROUTE: ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE,
          value: {
            text: mockAnswersContent[TRIED_PRIVATE_COVER_YES].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when `unable to get private cover` is false', () => {
      it(`should add a ${TRIED_PRIVATE_COVER_NO} object to EXPORT_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [TRIED_PRIVATE_COVER_NO]: {
            text: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER_NO],
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.EXPORT_DETAILS[result.EXPORT_DETAILS.length - 2];

        const expected = {
          ID: TRIED_PRIVATE_COVER_NO,
          ...FIELDS[TRIED_PRIVATE_COVER_NO],
          CHANGE_ROUTE: ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE,
          value: {
            text: mockAnswersContent[TRIED_PRIVATE_COVER_NO].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is single', () => {
      it(`should add a ${SINGLE_POLICY_TYPE} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 3];

        const expected = {
          ID: SINGLE_POLICY_TYPE,
          ...FIELDS[SINGLE_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${SINGLE_POLICY_LENGTH} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          ...mockAnswers,
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 2];

        const expected = {
          ID: SINGLE_POLICY_LENGTH,
          ...FIELDS[SINGLE_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it(`should add a ${MULTI_POLICY_TYPE} object to DEAL_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 3];

        const expected = {
          ID: MULTI_POLICY_TYPE,
          ...FIELDS[MULTI_POLICY_TYPE],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[MULTI_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${MULTI_POLICY_LENGTH} object to DEAL_DETAILS with single policy length field values`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockAnswers),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.DEAL_DETAILS[result.DEAL_DETAILS.length - 2];

        const expected = {
          ID: MULTI_POLICY_LENGTH,
          ...FIELDS[MULTI_POLICY_LENGTH],
          CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
          value: {
            text: mockAnswersContent[MULTI_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const fieldGroups = generateFieldGroups(mockAnswers);

      const result = generateSummaryListRows(
        fieldGroups.EXPORT_DETAILS,
        mockAnswers,
      );

      const expectedObj = (field) => ({
        key: {
          text: FIELDS[field.ID].SUMMARY.TITLE,
          classes: `${field.ID}-key`,
        },
        value: {
          text: mockAnswers[field.ID].text,
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
      });

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(mockFields[0]);
      expect(result[0]).toEqual(expected);
    });
  });

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockAnswersContent = mapAnswersToContent(mockAnswers);

      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = generateSummaryList(mockAnswersContent);

      const expected = {
        EXPORT: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS, mockAnswers),
        },
        DEAL: {
          GROUP_TITLE: PAGES.CHECK_YOUR_ANSWERS_PAGE.GROUP_HEADING_DEAL,
          ROWS: generateSummaryListRows(fieldGroups.DEAL_DETAILS, mockAnswers),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
