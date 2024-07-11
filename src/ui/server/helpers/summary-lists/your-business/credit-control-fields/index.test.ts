import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateTurnoverFields from '.';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { mockBusiness, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  YOUR_BUSINESS: { CREDIT_CONTROL: FORM_TITLE },
} = FORM_TITLES;

const {
  EXPORTER_BUSINESS: { CREDIT_CONTROL_CHANGE, CREDIT_CONTROL_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: { HAS_CREDIT_CONTROL },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/your-business/credit-control-fields', () => {
  const mockAnswers = mockBusiness;
  const checkAndChange = false;

  const expectedFields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, HAS_CREDIT_CONTROL),
        data: mockAnswers,
        href: generateChangeLink(CREDIT_CONTROL_CHANGE, CREDIT_CONTROL_CHECK_AND_CHANGE, `#${HAS_CREDIT_CONTROL}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[HAS_CREDIT_CONTROL]),
    ),
  ];

  it('should return a title and fields from the submitted data/answers', () => {
    const result = generateTurnoverFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedFields,
    };

    expect(result).toEqual(expected);
  });
});
