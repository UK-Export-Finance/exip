import { ApplicationFlat } from '../../../../types';
import { getSubmittedFields } from '../../get-submitted-fields';
import isPopulatedArray from '../../is-populated-array';

/**
 * taskIsInProgress
 * @param {Array} taskFields Array of field ids associated with the tak
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
const sectionIsInProgress = (taskFields: Array<string>, submittedData: ApplicationFlat) => {
  const submittedFields = getSubmittedFields(taskFields, submittedData);

  if (isPopulatedArray(submittedFields) && submittedFields.length < taskFields.length) {
    return true;
  }

  return false;
};

export default sectionIsInProgress;
