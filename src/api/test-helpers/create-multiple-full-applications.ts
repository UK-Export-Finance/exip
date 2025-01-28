import createFullApplication from './create-full-application';
import applications from './applications';
import { Application, Context } from '../types';

/**
 * createMultipleFullApplications
 * Create multiple full applications for unit testing
 * @param {Context} context: KeystoneJS context API
 * @returns {Array<Application>} Applications array
 */
export const createMultipleFullApplications = async (context: Context): Promise<Array<Application>> => {
  try {
    console.info('Creating multiple full applications (test helpers)');

    await applications.deleteAll(context);

    const promises = (await Promise.all([
      await createFullApplication(context),
      await createFullApplication(context),
      await createFullApplication(context),
      await createFullApplication(context),
      await createFullApplication(context),
      await createFullApplication(context),
    ])) as Array<Application>;

    return promises;
  } catch (error) {
    console.error('Error creating multiple full applications (test helpers)');

    throw new Error('Error creating multiple full applications (test helpers)');
  }
};

export default createMultipleFullApplications;
