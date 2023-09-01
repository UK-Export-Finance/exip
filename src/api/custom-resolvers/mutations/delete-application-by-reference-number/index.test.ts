import deleteApplicationByReferenceNumber from '.';
import applications from '../../../test-helpers/applications';
import { Application, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

describe('custom-resolvers/mutations/delete-application-by-reference-number', () => {
  let application: Application;
  let result: SuccessResponse;

  const variables = {
    referenceNumber: 0,
  };

  beforeAll(async () => {
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
