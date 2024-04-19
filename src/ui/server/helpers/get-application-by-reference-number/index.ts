import api from '../../api';
import { ApplicationByReferenceNumberVariables } from '../../../types';

/**
 * getApplication
 * Get an application from the API/DB
 * @param {Number} Application reference number
 * @returns {Object} Application
 */
const getApplicationByReferenceNumber = async (variables: ApplicationByReferenceNumberVariables) => {
  try {
    const application = await api.keystone.application.getByReferenceNumber(variables);

    // check that the application exists and has core structure.
    if (!application?.id) {
      return false;
    }

    return application;
  } catch (err) {
    throw new Error(`Getting application by reference number ${err}`);
  }
};

export default getApplicationByReferenceNumber;
