import workingWithBuyerFields, { optionalFields } from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, CONNECTION_WITH_BUYER_CHANGE, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION, TRADED_WITH_BUYER } = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/working-with-buyer-fields', () => {
  const mockAnswers = mockApplicationBuyer;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('optionalFields', () => {
    describe(`${CONNECTION_WITH_BUYER} is true`, () => {
      it(`should return fields and values from the submitted data/answers including ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem(
            {
              field: getFieldById(FIELDS, CONNECTION_WITH_BUYER),
              data: mockAnswers,
              href: generateChangeLink(
                CONNECTION_WITH_BUYER_CHANGE,
                CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
                `#${CONNECTION_WITH_BUYER}-label`,
                referenceNumber,
                checkAndChange,
              ),
              renderChangeLink: true,
            },
            mapYesNoField(mockAnswers[CONNECTION_WITH_BUYER]),
          ),
          fieldGroupItem({
            field: getFieldById(FIELDS, CONNECTION_WITH_BUYER_DESCRIPTION),
            data: mockAnswers,
            href: generateChangeLink(
              CONNECTION_WITH_BUYER_CHANGE,
              CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
              `#${CONNECTION_WITH_BUYER_DESCRIPTION}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`${CONNECTION_WITH_BUYER} is false`, () => {
      it(`should return fields and values from the submitted data/answers, not including ${CONNECTION_WITH_BUYER_DESCRIPTION}`, () => {
        mockAnswers[CONNECTION_WITH_BUYER] = false;
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem(
            {
              field: getFieldById(FIELDS, CONNECTION_WITH_BUYER),
              data: mockAnswers,
              href: generateChangeLink(
                CONNECTION_WITH_BUYER_CHANGE,
                CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
                `#${CONNECTION_WITH_BUYER}-label`,
                referenceNumber,
                checkAndChange,
              ),
              renderChangeLink: true,
            },
            mapYesNoField(mockAnswers[CONNECTION_WITH_BUYER]),
          ),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('workingWithBuyerFields', () => {
    const expectedBase = [
      ...optionalFields(mockAnswers, referenceNumber, checkAndChange),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TRADED_WITH_BUYER),
          data: mockAnswers,
          href: generateChangeLink(
            TRADED_WITH_BUYER_CHANGE,
            TRADED_WITH_BUYER_CHECK_AND_CHANGE,
            `#${TRADED_WITH_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers.buyerTradingHistory[TRADED_WITH_BUYER]),
      ),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[CONNECTION_WITH_BUYER] = true;

      const result = workingWithBuyerFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });
});
