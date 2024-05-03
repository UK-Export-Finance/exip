import createFullApplication from './create-full-application';
import { Application, Context } from '../types';

/**
 * createMultipleFullApplications
 * Create multiple full applications for unit testing
 * @param {Object} KeystoneJS context API
 * @param {Number} count for array loop
 * @returns {Array<Application>} Applications array
 */
export const createMultipleFullApplications = async (context: Context, count: number): Promise<Array<Application>> => {
  const arr = new Array(count).fill({}).map(() => createFullApplication(context));

  const applications = await Promise.all(arr);

  return applications;
};

export default createMultipleFullApplications;
