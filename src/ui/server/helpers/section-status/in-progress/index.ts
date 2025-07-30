import { getSubmittedFields } from '../../get-submitted-fields';
import { isPopulatedArray } from '../../array';
import { ApplicationFlat } from '../../../../types';

/**
 * sectionIsInProgress
 * @param {Array} fields Array of field ids associated with the task
 * @param {object} submittedData Submitted application data
 * @returns {boolean}
 */
const sectionIsInProgress = (fields: Array<string>, submittedData: ApplicationFlat) => {
  const submittedFields = getSubmittedFields(fields, submittedData);

  if (isPopulatedArray(submittedFields) && submittedFields.length < fields.length) {
    return true;
  }

  return false;
};

export default sectionIsInProgress;
