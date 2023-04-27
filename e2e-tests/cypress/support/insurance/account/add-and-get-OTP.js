import api from '../../api';

/**
 * addAndGetOTP
 * Add an OTP to exporter account and return the OTP directly from the API.
 * @returns {String} Valid OTP
 */
const addAndGetOTP = () => api.addAndGetOTP().then((validSecurityCode) => validSecurityCode);

export default addAndGetOTP;
