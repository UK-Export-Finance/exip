import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateNatureOfYourBusinessFields from '.';
import { mockBusiness, referenceNumber } from '../../../../test-mocks/mock-application';
import generateChangeLink from '../../../generate-change-link';

const {
  YOUR_BUSINESS: { NATURE_OF_BUSINESS: FORM_TITLE },
} = FORM_TITLES;

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
} = FIELD_IDS;

const { NATURE_OF_YOUR_BUSINESS } = EXPORTER_BUSINESS_FIELDS;

describe('server/helpers/summary-lists/your-business/nature-of-your-business-fields', () => {
  const mockAnswers = mockBusiness;
  const checkAndChange = false;

  const expectedFields = [
    fieldGroupItem({
      field: getFieldById(NATURE_OF_YOUR_BUSINESS, GOODS_OR_SERVICES),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${GOODS_OR_SERVICES}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(NATURE_OF_YOUR_BUSINESS, YEARS_EXPORTING),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${YEARS_EXPORTING}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(NATURE_OF_YOUR_BUSINESS, EMPLOYEES_UK),
      data: mockAnswers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${EMPLOYEES_UK}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ];

  it('should return a title and fields from the submitted data/answers', () => {
    const result = generateNatureOfYourBusinessFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedFields,
    };

    expect(result).toEqual(expected);
  });
});
