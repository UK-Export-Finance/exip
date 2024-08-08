import api from '../../api';
import { ApplicationByReferenceNumberVariables } from '../../../types';

/**
 * getApplication
 * Get an application from the API/DB
 * @param {Number} Application reference number
 * @returns {Application} Application
 */
const getApplicationByReferenceNumber = async (variables: ApplicationByReferenceNumberVariables) => {
  try {
    const application = await api.keystone.application.getByReferenceNumber(variables);

    // check that the application exists and has core structure.
    if (!application?.id) {
      return false;
    }

    return application;
  } catch (error) {
    throw new Error(`Getting application by reference number ${error}`);
  }
};

export default getApplicationByReferenceNumber;
