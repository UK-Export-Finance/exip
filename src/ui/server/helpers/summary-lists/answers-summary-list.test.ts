import { generateFieldGroups, answersSummaryList } from './answers-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import { mapAnswersToContent } from '../data-content-mappings/map-answers-to-content';
import { FIELDS, PAGES } from '../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../constants';
import { mockSession } from '../../test-mocks';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

describe('server/helpers/summary-lists/answers-summary-list', () => {
  describe('generateFieldGroups - no policy type', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData.quoteEligibility);
      delete mockAnswersContent[SINGLE_POLICY_TYPE];
      delete mockAnswersContent[SINGLE_POLICY_LENGTH];

      const result = generateFieldGroups(mockAnswersContent);

      const expected = {
        EXPORT_DETAILS: [
          {
            id: BUYER_COUNTRY,
            ...FIELDS[BUYER_COUNTRY],
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[BUYER_COUNTRY].text,
            },
          },
          {
            id: VALID_EXPORTER_LOCATION,
            ...FIELDS[VALID_EXPORTER_LOCATION],
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[VALID_EXPORTER_LOCATION].text,
            },
          },
          {
            id: HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            ...FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`,
            value: {
              text: mockAnswersContent[HAS_MINIMUM_UK_GOODS_OR_SERVICES].text,
            },
          },
        ],
        POLICY_DETAILS: [],
      };

      expect(result).toEqual(expected);
    });

    describe('when policy type is single', () => {
      it(`should add a ${SINGLE_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent({
            ...mockSession.submittedData.quoteEligibility,
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          }),
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = {
          id: SINGLE_POLICY_TYPE,
          ...FIELDS[SINGLE_POLICY_TYPE],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${SINGLE_POLICY_LENGTH} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData.quoteEligibility),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[1];

        const expected = {
          id: SINGLE_POLICY_LENGTH,
          ...FIELDS[SINGLE_POLICY_LENGTH],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
          value: {
            text: mockAnswersContent[SINGLE_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CONTRACT_VALUE} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData.quoteEligibility),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[result.POLICY_DETAILS.length - 2];

        const expected = {
          id: CONTRACT_VALUE,
          ...FIELDS[CONTRACT_VALUE],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
          value: {
            text: mockAnswersContent[CONTRACT_VALUE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${PERCENTAGE_OF_COVER} object to POLICY_DETAILS`, () => {
        const mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData.quoteEligibility),
          [SINGLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[result.POLICY_DETAILS.length - 1];

        const expected = {
          id: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
          value: {
            text: mockAnswersContent[PERCENTAGE_OF_COVER].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      let mockAnswersContent: object;

      beforeEach(() => {
        mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData.quoteEligibility),
          [MULTI_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTI,
          },
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
          [MAX_AMOUNT_OWED]: {
            text: '£12,345',
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
      });

      it(`should add a ${MULTI_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = {
          id: MULTI_POLICY_TYPE,
          ...FIELDS[MULTI_POLICY_TYPE],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
          value: {
            text: mockAnswersContent[MULTI_POLICY_TYPE].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${MULTI_POLICY_LENGTH} object to POLICY_DETAILS with single policy length field values`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[1];

        const expected = {
          id: MULTI_POLICY_LENGTH,
          ...FIELDS[MULTI_POLICY_LENGTH],
          value: {
            text: mockAnswersContent[MULTI_POLICY_LENGTH].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${MAX_AMOUNT_OWED} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[2];

        const expected = {
          id: MAX_AMOUNT_OWED,
          ...FIELDS[MAX_AMOUNT_OWED],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
          value: {
            text: mockAnswersContent[MAX_AMOUNT_OWED].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${PERCENTAGE_OF_COVER} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[3];

        const expected = {
          id: PERCENTAGE_OF_COVER,
          ...FIELDS[PERCENTAGE_OF_COVER],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
          value: {
            text: mockAnswersContent[PERCENTAGE_OF_COVER].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CREDIT_PERIOD} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[4];

        const expected = {
          id: CREDIT_PERIOD,
          ...FIELDS[CREDIT_PERIOD],
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
          value: {
            text: mockAnswersContent[CREDIT_PERIOD].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('answersSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockAnswersContent = mapAnswersToContent(mockSession.submittedData.quoteEligibility);

      const fieldGroups = generateFieldGroups(mockAnswersContent);

      const result = answersSummaryList(mockAnswersContent);

      const expected = {
        EXPORT: {
          GROUP_TITLE: PAGES.QUOTE.CHECK_YOUR_ANSWERS.GROUP_HEADING_EXPORT,
          ROWS: generateSummaryListRows(fieldGroups.EXPORT_DETAILS),
        },
        POLICY: {
          GROUP_TITLE: PAGES.QUOTE.CHECK_YOUR_ANSWERS.GROUP_HEADING_POLICY,
          ROWS: generateSummaryListRows(fieldGroups.POLICY_DETAILS),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
