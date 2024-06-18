import { Application, Context } from '.keystone/types'; // eslint-disable-line
import mapInactiveApplications from '../map-inactive-applications';

/**
 * mapAndUpdateInactiveApplications
 * maps and generates save object for inactive applications
 * updates application statuses to abandoned
 * @param {Array<Application>} applications: array of applications
 * @param {Context} context
 */
const mapAndUpdateInactiveApplications = async (applications: Array<Application>, context: Context) => {
  try {
    console.info('Mapping and updating inactive applications - mapAndUpdateInactiveApplications');

    /**
     * generates data array for database saving
     * contains where and data (status change)
     */
    const updateData = mapInactiveApplications(applications);

    await context.db.Application.updateMany({
      data: updateData,
    });
  } catch (err) {
    console.error('Error mapping and updating inactive applications %O', err);
    throw new Error(`Error mapping and updating inactive applications ${err}`);
  }
};

export default mapAndUpdateInactiveApplications;
