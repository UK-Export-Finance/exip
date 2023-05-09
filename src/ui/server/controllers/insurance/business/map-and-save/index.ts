import hasFormData from '../../../../helpers/has-form-data';
import save from '../save-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';
import mapCompanyDetailsSubmittedData from '../company-details/map-submitted-data';
import mapNatureOfBusinessSubmittedData from '../nature-of-business/map-submitted-data';
import mapTurnoverSubmittedData from '../turnover/map-submitted-data';

/**
 * maps company details request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const companyDetails = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      const dataToSave = mapCompanyDetailsSubmittedData(formBody, application);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.companyDetails(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await save.companyDetails(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });
    return false;
  }
};

/**
 * maps nature of business request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const natureOfBusiness = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      const dataToSave = mapNatureOfBusinessSubmittedData(formBody);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.business(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await save.business(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });
    return false;
  }
};

/**
 * maps turnover request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const turnover = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      const dataToSave = mapTurnoverSubmittedData(formBody);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.business(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await save.business(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });
    return false;
  }
};

const broker = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.exporterBroker(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.exporterBroker(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });
    return false;
  }
};
export default {
  companyDetails,
  natureOfBusiness,
  turnover,
  broker,
};
