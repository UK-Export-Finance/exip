import workingWithBuyerFields from '.';
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
    YOUR_BUYER: { WORKING_WITH_BUYER_CHANGE, WORKING_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/working-with-buyer-fields', () => {
  const mockAnswers = mockApplicationBuyer;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.WORKING_WITH_BUYER, CONNECTED_WITH_BUYER),
        data: mockAnswers,
        href: generateChangeLink(
          WORKING_WITH_BUYER_CHANGE,
          WORKING_WITH_BUYER_CHECK_AND_CHANGE,
          `#${CONNECTED_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[CONNECTED_WITH_BUYER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.WORKING_WITH_BUYER, TRADED_WITH_BUYER),
        data: mockAnswers,
        href: generateChangeLink(
          WORKING_WITH_BUYER_CHANGE,
          WORKING_WITH_BUYER_CHECK_AND_CHANGE,
          `#${TRADED_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[TRADED_WITH_BUYER]),
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = workingWithBuyerFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expectedBase);
  });
});
