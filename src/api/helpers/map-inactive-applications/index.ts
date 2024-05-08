import { Application } from '.keystone/types'; // eslint-disable-line
import { APPLICATION } from '../../constants';
import { CronApplicationInactiveUpdate } from '../../types';

/**
 * mapInactiveApplications
 * generates array of objects for updating the db
 * object contains where object with id of application to be updated
 * contains data object with fields which are updated
 * @param {Array<CronApplicationInactiveUpdate>} applications: array of application ids and statuses
 * @returns {Array<CronApplicationInactiveUpdate>}: Array of objects for updating db
 */
const mapInactiveApplications = (applications: Array<Application>) => {
  /**
   * loops through applications array
   * adds id to where object
   * adds abandoned status to status, previous status and updatedAt
   * pushes to mappedArray
   */
  const mappedArray = applications.map((application: Application) => {
    const mapped = {
      where: { id: application.id },
      data: {
        status: APPLICATION.STATUS.ABANDONED,
        previousStatus: application.status,
        updatedAt: new Date(),
      },
    } as CronApplicationInactiveUpdate;

    return mapped;
  });

  return mappedArray;
};

export default mapInactiveApplications;
