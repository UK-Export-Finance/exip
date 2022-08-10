import generateValidationErrors from './validation';

describe('server/helpers/validation', () => {
  it('should return errorList and summary from given params', () => {
    const result = generateValidationErrors(
      'firstName',
      'Enter first name',
    );

    expect(result).toEqual({
      count: 1,
      errorList: {
        firstName: {
          text: 'Enter first name',
          order: 1,
        },
      },
      summary: [{
        text: 'Enter first name',
        href: '#firstName',
      }],
    });
  });

  it('should return errorList and summary with multiple errors, incrementing the order and count', () => {
    const firstNameErrors = generateValidationErrors(
      'firstName',
      'Enter first name',
    );

    const middleNameErrors = generateValidationErrors(
      'middleName',
      'Enter middle name',
      firstNameErrors,
    );

    const previousErrors = middleNameErrors;

    const result = generateValidationErrors(
      'lastName',
      'Enter last name',
      previousErrors,
    );

    expect(result).toEqual({
      count: 3,
      errorList: {
        firstName: {
          text: 'Enter first name',
          order: 1,
        },
        middleName: {
          text: 'Enter middle name',
          order: 2,
        },
        lastName: {
          text: 'Enter last name',
          order: 3,
        },
      },
      summary: [
        {
          text: 'Enter first name',
          href: '#firstName',
        },
        {
          text: 'Enter middle name',
          href: '#middleName',
        },
        {
          text: 'Enter last name',
          href: '#lastName',
        },
      ],
    });
  });
});
