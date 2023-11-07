import nameValidation from '.';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

describe('shared-validation/name', () => {
  const FIELD_ID = 'field';

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  const errorMessage = 'Is empty';

  it('should return the result of emptyFieldValidation', () => {
    const response = nameValidation(mockBody, FIELD_ID, errorMessage, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, errorMessage, mockErrors);

    expect(response).toEqual(expected);
  });
});
