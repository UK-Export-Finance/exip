import generateSameNameFields from './same-name-fields';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { mockApplication, mockContact } from '../../../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
} = INSURANCE_FIELD_IDS;
const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

const {
  POLICY_AND_EXPORTS: { NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy-and-export/policy-contact-fields/same-name-fields', () => {
  const mockAnswers = mockContact;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedArray = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.NAME_ON_POLICY, NAME),
        renderChangeLink: true,
        href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
      },
      `${mockContact[FIRST_NAME]} ${mockContact[LAST_NAME]}`,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.NAME_ON_POLICY, POSITION),
        renderChangeLink: true,
        href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${POSITION}-label`, referenceNumber, checkAndChange),
      },
      mockContact[POSITION],
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateSameNameFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expectedArray);
  });
});
