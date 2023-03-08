import workingWithBuyerFields from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    YOUR_BUYER: { WORKING_WITH_BUYER_CHANGE },
  },
} = ROUTES;

const {
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/working-with-buyer-fields', () => {
  const mockAnswers = mockApplicationBuyer;
  const { referenceNumber } = mockApplication;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.WORKING_WITH_BUYER, CONNECTED_WITH_BUYER),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER_CHANGE}#${CONNECTED_WITH_BUYER}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.WORKING_WITH_BUYER, TRADED_WITH_BUYER),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER_CHANGE}#${TRADED_WITH_BUYER}-label`,
      renderChangeLink: true,
    }),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = workingWithBuyerFields(mockAnswers, referenceNumber);

    expect(result).toEqual(expectedBase);
  });
});
