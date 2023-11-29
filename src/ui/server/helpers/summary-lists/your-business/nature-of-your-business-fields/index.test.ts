import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateNatureOfYourBusinessFields from '.';
import mockApplication, { mockBusiness } from '../../../../test-mocks/mock-application';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/nature-of-your-business-fields', () => {
  const mockAnswers = mockBusiness;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, GOODS_OR_SERVICES),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${GOODS_OR_SERVICES}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, YEARS_EXPORTING),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${YEARS_EXPORTING}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_UK),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${EMPLOYEES_UK}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateNatureOfYourBusinessFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expectedBase);
  });
});
