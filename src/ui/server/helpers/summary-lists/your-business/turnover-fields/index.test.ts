import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateTurnoverFields from '.';
import mapPercentage from '../../../map-percentage';
import mockApplication, { mockExporterBusiness } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { TURNOVER_CHANGE },
  },
} = ROUTES;

const {
  TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/turnover-fields', () => {
  const mockAnswers = mockExporterBusiness;
  const { referenceNumber } = mockApplication;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.TURNOVER, ESTIMATED_ANNUAL_TURNOVER),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_CHANGE}#${ESTIMATED_ANNUAL_TURNOVER}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.TURNOVER, PERCENTAGE_TURNOVER),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_CHANGE}#${PERCENTAGE_TURNOVER}-label`,
        renderChangeLink: true,
      },
      mapPercentage(mockAnswers[PERCENTAGE_TURNOVER]),
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateTurnoverFields(mockAnswers, referenceNumber);

    expect(result).toEqual(expectedBase);
  });
});
