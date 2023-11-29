import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateTurnoverFields from '.';
import mapPercentage from '../../../map-percentage';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockBusiness } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/turnover-fields', () => {
  const mockAnswers = mockBusiness;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, ESTIMATED_ANNUAL_TURNOVER),
        data: mockAnswers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${ESTIMATED_ANNUAL_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      `£${mockAnswers[ESTIMATED_ANNUAL_TURNOVER]}`,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, PERCENTAGE_TURNOVER),
        data: mockAnswers,
        href: generateChangeLink(TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE, `#${PERCENTAGE_TURNOVER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapPercentage(mockAnswers[PERCENTAGE_TURNOVER]),
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateTurnoverFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expectedBase);
  });
});
