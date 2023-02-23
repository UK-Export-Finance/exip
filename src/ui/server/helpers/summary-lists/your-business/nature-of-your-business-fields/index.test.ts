import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateNatureOfYourBusinessFields from '.';
import mockApplication, { mockExporterBusiness } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE },
  },
} = ROUTES;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
} = FIELD_IDS;

describe('server/helpers/summary-lists/your-business/nature-of-your-business-fields', () => {
  const mockAnswers = mockExporterBusiness;
  const { referenceNumber } = mockApplication;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, GOODS_OR_SERVICES),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${GOODS_OR_SERVICES}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, YEARS_EXPORTING),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${YEARS_EXPORTING}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_UK),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${EMPLOYEES_UK}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_INTERNATIONAL),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${EMPLOYEES_INTERNATIONAL}-label`,
      renderChangeLink: true,
    }),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateNatureOfYourBusinessFields(mockAnswers, referenceNumber);

    expect(result).toEqual(expectedBase);
  });
});
