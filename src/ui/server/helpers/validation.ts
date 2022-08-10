import { ValidationErrors } from '../../types';

const generateValidationErrors = (fieldId: string, errorText: string, errors: ValidationErrors = { errorList: {}, summary: [] }) => {
  let summary = [
    {
      text: errorText,
      href: `#${fieldId}`,
    },
  ];

  if (errors && errors.summary && errors.summary.length) {
    summary = [
      ...errors.summary,
      {
        text: errorText,
        href: `#${fieldId}`,
      },
    ];
  }

  const keys = Object.keys(errors.errorList || {});

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
