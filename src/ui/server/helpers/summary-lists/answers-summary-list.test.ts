import { generateFieldGroups, answersSummaryList } from './answers-summary-list';
import generateSummaryListRows from './generate-summary-list-rows';
import { mapAnswersToContent } from '../data-content-mappings/map-answers-to-content';
import { FIELDS, PAGES } from '../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../constants';
import fieldGroupItem from './generate-field-group-item';
import getFieldById from '../get-field-by-id';
import { mockSession } from '../../test-mocks';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTIPLE_POLICY_LENGTH,
  MULTIPLE_POLICY_TYPE,
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
          fieldGroupItem({
            field: getFieldById(FIELDS, BUYER_COUNTRY),
            data: mockAnswersContent,
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
          }),
          fieldGroupItem({
            field: getFieldById(FIELDS, VALID_EXPORTER_LOCATION),
            data: mockAnswersContent,
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`,
          }),
          fieldGroupItem({
            field: getFieldById(FIELDS, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
            data: mockAnswersContent,
            renderChangeLink: true,
            href: `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`,
          }),
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

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, SINGLE_POLICY_TYPE),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
        });

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

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, SINGLE_POLICY_LENGTH),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
        });

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

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, CONTRACT_VALUE),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
        });

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

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, PERCENTAGE_OF_COVER),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        });

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      let mockAnswersContent: object;

      beforeEach(() => {
        mockAnswersContent = {
          ...mapAnswersToContent(mockSession.submittedData.quoteEligibility),
          [MULTIPLE_POLICY_TYPE]: {
            text: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          },
          [MULTIPLE_POLICY_LENGTH]: {
            text: 2,
          },
          [MAX_AMOUNT_OWED]: {
            text: '£12,345',
          },
        };

        delete mockAnswersContent[SINGLE_POLICY_TYPE];
      });

      it(`should add a ${MULTIPLE_POLICY_TYPE} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[0];

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, MULTIPLE_POLICY_TYPE),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`,
        });

        expect(expectedField).toEqual(expected);
      });

      it(`should add a ${MULTIPLE_POLICY_LENGTH} object to POLICY_DETAILS with single policy length field values`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[1];

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, MULTIPLE_POLICY_LENGTH),
          data: mockAnswersContent,
        });

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${MAX_AMOUNT_OWED} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[2];

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, MAX_AMOUNT_OWED),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
        });

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${PERCENTAGE_OF_COVER} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[3];

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, PERCENTAGE_OF_COVER),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
        });

        expect(expectedField).toEqual(expected);
      });

      it(`should add ${CREDIT_PERIOD} object to POLICY_DETAILS`, () => {
        const result = generateFieldGroups(mockAnswersContent);

        const expectedField = result.POLICY_DETAILS[4];

        const expected = fieldGroupItem({
          field: getFieldById(FIELDS, CREDIT_PERIOD),
          data: mockAnswersContent,
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`,
        });

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
