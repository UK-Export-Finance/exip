import generatePolicyContactFields from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';
import { referenceNumber, mockContact } from '../../../../test-mocks';

const {
  POLICY: { NAME_ON_POLICY: FORM_TITLE },
} = FORM_TITLES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION, IS_SAME_AS_OWNER },
  },
} = INSURANCE_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY: { NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy/policy-contact-fields', () => {
  const mockAnswers = mockContact;
  const checkAndChange = false;

  it(`should return relevant fields and values including ${EMAIL} field without a change link when ${IS_SAME_AS_OWNER} is true`, () => {
    const expectedFields = [
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
          field: getFieldById(FIELDS.DIFFERENT_NAME_ON_POLICY, EMAIL),
          renderChangeLink: false,
          href: generateChangeLink(
            DIFFERENT_NAME_ON_POLICY_CHANGE,
            DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
            `#${EMAIL}-label`,
            referenceNumber,
            checkAndChange,
          ),
        },
        mockContact[EMAIL],
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

    mockAnswers[IS_SAME_AS_OWNER] = true;

    const result = generatePolicyContactFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedFields,
    };

    expect(result).toEqual(expected);
  });

  it(`should return the relevant fields and values including ${EMAIL} field with a change link when ${IS_SAME_AS_OWNER} is false`, () => {
    mockAnswers[IS_SAME_AS_OWNER] = false;

    const expectedFields = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.NAME_ON_POLICY, NAME),
          renderChangeLink: true,
          href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
        },
        `${mockAnswers[FIRST_NAME]} ${mockAnswers[LAST_NAME]}`,
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.DIFFERENT_NAME_ON_POLICY, EMAIL),
          renderChangeLink: true,
          href: generateChangeLink(
            DIFFERENT_NAME_ON_POLICY_CHANGE,
            DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
            `#${EMAIL}-label`,
            referenceNumber,
            checkAndChange,
          ),
        },
        mockAnswers[EMAIL],
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.NAME_ON_POLICY, POSITION),
          renderChangeLink: true,
          href: generateChangeLink(
            DIFFERENT_NAME_ON_POLICY_CHANGE,
            DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
            `#${POSITION}-label`,
            referenceNumber,
            checkAndChange,
          ),
        },
        mockAnswers[POSITION],
      ),
    ];

    const result = generatePolicyContactFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedFields,
    };

    expect(result).toEqual(expected);
  });
});
