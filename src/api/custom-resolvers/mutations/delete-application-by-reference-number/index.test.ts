import deleteApplicationByReferenceNumber from '.';
import applications from '../../../test-helpers/applications';
import { Application, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/delete-application-by-reference-number', () => {
  let context: Context;
  let application: Application;
  let result: SuccessResponse;

  const variables = {
    referenceNumber: 0,
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({
      context,
      data: {},
    })) as Application;
  });

  test('it should return success=true', async () => {
    variables.referenceNumber = application.referenceNumber;

    result = await deleteApplicationByReferenceNumber({}, variables, context);

    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe('when an application is not found', () => {
    it('should return success=false', async () => {
      const referenceNumberDoesNotExist = 0;

      variables.referenceNumber = referenceNumberDoesNotExist;

      result = await deleteApplicationByReferenceNumber({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
