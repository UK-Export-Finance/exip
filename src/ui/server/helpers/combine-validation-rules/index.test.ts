import combinedValidationRules from '.';
import generateValidationErrors from '../validation';
import { ValidationErrors } from '../../../types';

type MockFormBody = {
  firstName?: string;
  lastName?: string;
};

describe('server/helpers/combine-validation-rules', () => {
  const mockRuleFirstName = (formData: MockFormBody, errors: ValidationErrors): ValidationErrors => {
    if (!formData.firstName) {
      return generateValidationErrors('firstName', 'Enter first name', errors);
    }

    return {};
  };

  const mockRuleLastName = (formData: MockFormBody, errors: ValidationErrors): ValidationErrors => {
    if (!formData.lastName) {
      return generateValidationErrors('lastName', 'Enter last name', errors);
    }
    return {};
  };

  describe('when there are rule errors', () => {
    it('should return an object with all errors combined', () => {
      const mockErrorFirstName = {
        errorList: {
          firstName: {
            order: 1,
            text: 'Enter first name',
          },
        },
        summary: [{ text: 'Enter first name', href: '#firstName' }],
      };

      const mockErrorLastName = {
        errorList: {
          firstName: mockErrorFirstName.errorList.firstName,
          lastName: {
            order: 2,
            text: 'Enter last name',
          },
        },
        summary: [{ text: 'Enter last name', href: '#lastName' }],
      };

      const mockFormBody = {};

      const mockRules = [
        (formData: MockFormBody, lastNameError: ValidationErrors) => mockRuleFirstName(formData, lastNameError),
        (formData: MockFormBody, firstNamError: ValidationErrors) => mockRuleLastName(formData, firstNamError),
      ];

      const result = combinedValidationRules(mockRules, mockFormBody);

      const expected = {
        count: 2,
        errorList: {
          firstName: mockErrorFirstName.errorList.firstName,
          lastName: mockErrorLastName.errorList.lastName,
        },
        summary: [...mockErrorFirstName.summary, ...mockErrorLastName.summary],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no rule errors', () => {
    it('should return false', () => {
      const result = combinedValidationRules([], {});

      expect(result).toEqual(false);
    });
  });
});
