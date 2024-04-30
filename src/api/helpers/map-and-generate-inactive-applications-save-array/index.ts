import { Application } from '.keystone/types'; // eslint-disable-line
import { APPLICATION } from '../../constants';
import { InactiveApplicationUpdate } from '../../types';

/**
 * mapAndGenerateInactiveApplicationSaveArray
 * generates array of objects for updating the db
 * object contains where object with id of application to be updated
 * contains data object with fields which are updated
 * @param {Array<InactiveApplicationUpdate>} applications: array of application ids and statuses
 * @returns {Array<InactiveApplicationUpdate>}: Array of objects for updating db
 */
const mapAndGenerateInactiveApplicationSaveArray = (applications: Array<Application>) => {
  const updateArray = [] as Array<InactiveApplicationUpdate>;

  /**
   * loops through applications array
   * adds id to where object
   * adds abandoned status to status and previous status
   * pushes to updateArray
   */
  applications.forEach((application: Application) => {
    const update = {
      where: { id: application.id },
      data: {
        status: APPLICATION.STATUS.ABANDONED,
        previousStatus: application.status,
      },
    };

    updateArray.push(update);
  });

  return updateArray;
};

export default mapAndGenerateInactiveApplicationSaveArray;
