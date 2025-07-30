import api from '../../api';

/**
 * addAndGetOTP
 * Add an OTP to an account and return the OTP directly from the API,
 * @param {string} Account email address
 * @returns {string} Valid OTP
 */
const addAndGetOTP = (emailAddress) => api.addAndGetOTP(emailAddress).then((validSecurityCode) => validSecurityCode);

export default addAndGetOTP;
