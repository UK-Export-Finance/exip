import generatePolicyContactFields from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import generateSameNameFields from './same-name-fields';
import generateOtherNameFields from './other-name-fields';
import { mockApplication, mockContact } from '../../../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER },
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/policy-contact-fields', () => {
  const mockAnswers = mockContact;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  it(`should return fields and values from generateSameNameFields when ${IS_SAME_AS_OWNER} is true`, () => {
    mockAnswers[IS_SAME_AS_OWNER] = true;

    const result = generatePolicyContactFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = generateSameNameFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expected);
  });

  it(`should return fields and values from generateOtherNameFields when ${IS_SAME_AS_OWNER} is false`, () => {
    mockAnswers[IS_SAME_AS_OWNER] = false;

    const result = generatePolicyContactFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = generateOtherNameFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expected);
  });
});
