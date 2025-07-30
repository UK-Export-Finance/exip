import { isPopulatedArray } from '../array';
import { ValidationErrors } from '../../../types';

/**
 * generateValidationErrors
 * Generate an error count, error list and summary for GOV design errors.
 * @param {string} fieldId: Field ID
 * @param {string} errorText: Error text
 * @param {ValidationErrors} errors: Existing validation errors
 * @returns {ValidationErrors} Error count, error list and summary
 */
const generateValidationErrors = (fieldId: string, errorText: string, errors: ValidationErrors = { errorList: {}, summary: [] }): ValidationErrors => {
  let summary = [
    {
      text: errorText,
      href: `#${fieldId}`,
    },
  ];

  if (errors.summary && isPopulatedArray(errors.summary)) {
    summary = [
      ...errors.summary,
      {
        text: errorText,
        href: `#${fieldId}`,
      },
    ];
  }

  const keys = Object.keys(errors.errorList ?? {});

  const result = {
    count: keys.length + 1,
    errorList: {
      ...errors.errorList,
      [fieldId]: {
        text: errorText,
        order: keys.length + 1,
      },
    },
    summary,
  };

  return result;
};

export default generateValidationErrors;
