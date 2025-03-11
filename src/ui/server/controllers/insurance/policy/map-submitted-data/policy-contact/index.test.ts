import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import { mockApplication, mockContact } from '../../../../../test-mocks';
import mapSubmittedData from '.';
import { RequestBody } from '../../../../../../types';

const {
  NAME_ON_POLICY: { NAME, POSITION, SAME_NAME, OTHER_NAME, IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const { owner } = mockApplication;

const expectedVariables = {
  [FIRST_NAME]: owner[FIRST_NAME],
  [LAST_NAME]: owner[LAST_NAME],
  [EMAIL]: owner[EMAIL],
};

describe('controllers/insurance/policy/map-submitted-data/policy-contact', () => {
  describe(`when ${NAME} is ${SAME_NAME}`, () => {
    const mockBody: RequestBody = {
      [NAME]: SAME_NAME,
      [POSITION]: 'CEO',
    };

    it(`should return an object with application owner contact details and should remove ${NAME} and add ${IS_SAME_AS_OWNER} as true`, () => {
      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        ...expectedVariables,
        [POSITION]: mockBody[POSITION],
        [IS_SAME_AS_OWNER]: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NAME} is ${OTHER_NAME}`, () => {
    const mockBody: RequestBody = {
      [NAME]: OTHER_NAME,
    };

    it(`should return an object without ${NAME} and add ${IS_SAME_AS_OWNER} as false`, () => {
      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        [IS_SAME_AS_OWNER]: false,
        [FIRST_NAME]: '',
        [LAST_NAME]: '',
        [EMAIL]: '',
        [POSITION]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NAME} is ${OTHER_NAME} and ${POSITION} is provided but application ${IS_SAME_AS_OWNER} is ${OTHER_NAME}`, () => {
    const mockBody: RequestBody = {
      [NAME]: OTHER_NAME,
    };

    it(`should retain ${POSITION}`, () => {
      mockBody[POSITION] = 'CEO';
      mockApplication.policyContact[POSITION] = 'CEO';

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        [IS_SAME_AS_OWNER]: false,
        [POSITION]: mockBody[POSITION],
        [FIRST_NAME]: mockBody[FIRST_NAME],
        [LAST_NAME]: mockBody[LAST_NAME],
        [EMAIL]: mockBody[EMAIL],
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NAME} is not provided`, () => {
    it('should return mockBody', () => {
      const result = mapSubmittedData(expectedVariables, mockApplication);

      expect(result).toEqual(expectedVariables);
    });
  });

  describe(`when ${NAME} is am empty string`, () => {
    const mockBody: RequestBody = {
      [NAME]: '',
      ...expectedVariables,
    };

    it(`should should mockBody without ${NAME}`, () => {
      const result = mapSubmittedData(mockBody, mockApplication);

      expect(result).toEqual(expectedVariables);
    });
  });

  describe(`when ${OTHER_NAME} the same as the application owner`, () => {
    const mockBody: RequestBody = {
      [NAME]: OTHER_NAME,
      ...mockContact,
    };

    const applicationSameOwner = mockApplication;

    it(`should replace ${IS_SAME_AS_OWNER} with true`, () => {
      applicationSameOwner.owner = mockContact;

      const result = mapSubmittedData(mockBody, applicationSameOwner);

      const expected = {
        id: mockBody.id,
        [IS_SAME_AS_OWNER]: true,
        [FIRST_NAME]: mockBody[FIRST_NAME],
        [LAST_NAME]: mockBody[LAST_NAME],
        [EMAIL]: mockBody[EMAIL],
        [POSITION]: mockBody[POSITION],
      };

      expect(result).toEqual(expected);
    });
  });
});
