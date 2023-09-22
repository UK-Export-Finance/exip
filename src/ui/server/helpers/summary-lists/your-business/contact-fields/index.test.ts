import generateBusinessContactFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';
import mockApplication from '../../../../test-mocks/mock-application';
import { mockContact } from '../../../../test-mocks';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  CONTACT: { POSITION, NAME },
} = FIELD_IDS;

const {
  ACCOUNT: { EMAIL, FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/your-business/contact-fields', () => {
  describe('generateBusinessContactFields', () => {
    const mockAnswers = mockContact;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;

    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTACT, NAME, 'contact'),
          data: mockAnswers,
          href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${FIRST_NAME}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        `${mockContact[FIRST_NAME]} ${mockContact[LAST_NAME]}`,
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTACT, EMAIL, 'contact'),
          data: mockAnswers,
          href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mockContact[EMAIL],
      ),
      fieldGroupItem({
        field: getFieldById(FIELDS.CONTACT, POSITION),
        data: mockAnswers,
        href: generateChangeLink(CONTACT_CHANGE, CONTACT_CHECK_AND_CHANGE, `#${POSITION}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      const result = generateBusinessContactFields(mockContact, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });
});
