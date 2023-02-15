import { RequestBody } from '../../../../../../types';

/**
 * maps broker formBody and removes _crsf
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  return populatedData;
};

export default mapSubmittedData;
