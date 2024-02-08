import { RequestBody } from '../../../../../../types';

/**
 * mapSubmittedData
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => formBody;

export default mapSubmittedData;
