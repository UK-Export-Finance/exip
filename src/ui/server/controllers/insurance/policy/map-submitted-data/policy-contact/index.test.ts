import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import { mockApplication } from '../../../../../test-mocks';
import mapSubmittedData from '.';

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
    const mockBody = {
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
    const mockBody = {
      [NAME]: OTHER_NAME,
    };

    it(`should return an object without ${NAME} and add ${IS_SAME_AS_OWNER} as false`, () => {
      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        [IS_SAME_AS_OWNER]: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NAME} is ${OTHER_NAME} and ${POSITION} is provided`, () => {
    const mockBody = {
      [NAME]: OTHER_NAME,
    };

    it(`should return an object without ${NAME} and add ${IS_SAME_AS_OWNER} as false and set ${POSITION} to empty string`, () => {
      mockBody[POSITION] = 'CEO';

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        [IS_SAME_AS_OWNER]: false,
        [POSITION]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NAME} is ${OTHER_NAME} and ${POSITION} is provided but application ${IS_SAME_AS_OWNER} is ${OTHER_NAME}`, () => {
    const mockBody = {
      [NAME]: OTHER_NAME,
    };

    it(`should retain ${POSITION}`, () => {
      mockBody[POSITION] = 'CEO';
      mockApplication.policyContact[POSITION] = 'CEO';

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        [IS_SAME_AS_OWNER]: false,
        [POSITION]: mockBody[POSITION],
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
    const mockBody = {
      [NAME]: '',
      ...expectedVariables,
    };

    it(`should should mockBody without ${NAME}`, () => {
      const result = mapSubmittedData(mockBody, mockApplication);

      expect(result).toEqual(expectedVariables);
    });
  });
});
