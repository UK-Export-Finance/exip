import { Application, RequestBody } from '../../../../../../types';

// TODO

/**
 * mapSubmittedData
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody, application: Application): object => ({
  ...application,
  ...formBody,
});

export default mapSubmittedData;
