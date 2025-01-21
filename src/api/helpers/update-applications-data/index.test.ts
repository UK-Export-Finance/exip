import updateApplicationsData from '.';
import createManyApplications from '../create-many-applications-and-reference-numbers';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import INITIAL_APPLICATION_DATA from '../../constants/application/initial-application-data';
import { Context, Application } from '../../types';

describe('helpers/update-applications-data', () => {
  let context: Context;
  let applications: Array<Application>;
  let referenceNumbers;

  const assertError = (error) => {
    const errorString = String(error);

    expect(errorString.includes('Updating many applications - helper')).toEqual(true);
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    ({ applications, referenceNumbers } = await createManyApplications(context, [INITIAL_APPLICATION_DATA, INITIAL_APPLICATION_DATA]));
  });

  it('should create multiple applications and reference numbers', async () => {
    const update = [
      {
        where: { id: applications[0].id },
        data: { referenceNumber: referenceNumbers[0].id },
      },
      {
        where: { id: applications[1].id },
        data: { referenceNumber: referenceNumbers[1].id },
      },
    ];

    const createdApplications = await updateApplicationsData(context, update);

    const expected = [
      {
        ...applications[0],
        referenceNumber: referenceNumbers[0].id,
      },
      {
        ...applications[1],
        referenceNumber: referenceNumbers[1].id,
      },
    ];

    expect(createdApplications).toEqual(expected);
  });

  describe('when update is not successful', () => {
    it('should throw an error', async () => {
      try {
        await updateApplicationsData({}, []);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
