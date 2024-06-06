import createFullApplication from './create-full-application';
import applications from './applications';
import { Application, Context } from '../types';

/**
 * createMultipleFullApplications
 * Create multiple full applications for unit testing
 * @param {Context} KeystoneJS context API
 * @returns {Array<Application>} Applications array
 */
export const createMultipleFullApplications = async (context: Context): Promise<Array<Application>> => {
  await applications.deleteAll(context);

  const application1 = await createFullApplication(context);
  const application2 = await createFullApplication(context);
  const application3 = await createFullApplication(context);
  const application4 = await createFullApplication(context);
  const application5 = await createFullApplication(context);
  const application6 = await createFullApplication(context);

  return [application1, application2, application3, application4, application5, application6];
};

export default createMultipleFullApplications;
