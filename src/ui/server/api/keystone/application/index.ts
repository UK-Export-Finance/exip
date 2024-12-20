import create from './create';
import declarations from './declarations';
import eligibility from './eligibility';
import getByReferenceNumber from './get-by-reference-number';
import submit from './submit';
import update from './update';

/**
 * application
 * Various API calls for an application
 * @returns {Object} API calls
 */
const application = {
  create,
  declarations,
  eligibility,
  getByReferenceNumber,
  submit,
  update,
};

export default application;
