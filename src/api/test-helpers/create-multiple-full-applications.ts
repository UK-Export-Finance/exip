import createFullApplication from './create-full-application';
import { Application, Context } from '../types';

/**
 * createMultipleFullApplications
 * Create multiple full applications for unit testing
 * @param {Object} KeystoneJS context API
 * @param {Number} count for array loop
 * @returns {Array<Application>} Applications array
 */
export const createMultipleFullApplications = async (context: Context): Promise<Array<Application>> => {
  const application1 = await createFullApplication(context);
  const application2 = await createFullApplication(context);
  const application3 = await createFullApplication(context);
  const application4 = await createFullApplication(context);
  const application5 = await createFullApplication(context);
  const application6 = await createFullApplication(context);

  return [application1, application2, application3, application4, application5, application6];
};

export default createMultipleFullApplications;