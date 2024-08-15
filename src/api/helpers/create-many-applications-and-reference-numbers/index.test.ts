import createManyApplications from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import INITIAL_APPLICATION_DATA from '../../constants/application/initial-application-data';
import { Context } from '../../types';

describe('helpers/create-many-applications-and-reference-numbers', () => {
  let context: Context;

  const assertError = (error) => {
    const errorString = String(error);

    expect(errorString.includes('Creating many applications and reference numbers - helper')).toEqual(true);
  };

  beforeEach(() => {
    // Set up the context object
    context = getKeystoneContext();
  });

  it('should create multiple applications and reference numbers', async () => {
    const applicationsData = [INITIAL_APPLICATION_DATA, INITIAL_APPLICATION_DATA, INITIAL_APPLICATION_DATA];

    const createdApplications = await createManyApplications(context, applicationsData);

    expect(createdApplications.applications).toHaveLength(applicationsData.length);
    expect(createdApplications.referenceNumbers).toHaveLength(applicationsData.length);
  });

  it('should return an empty array of applications and reference numbers if no applications data is provided', async () => {
    // Call the createManyApplications function without any applications data
    const createdApplications = await createManyApplications(context, []);

    expect(createdApplications.applications).toHaveLength(0);
    expect(createdApplications.referenceNumbers).toHaveLength(0);
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createManyApplications({}, []);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
