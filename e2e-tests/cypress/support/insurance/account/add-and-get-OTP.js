import api from '../../api';
import account from '../../../fixtures/account';

const { email } = account;

/**
 * addAndGetOTP
 * Add an OTP to exporter account and return the OTP directly from the API,
 * @returns {String} Valid OTP
 */
const addAndGetOTP = () => api.addAndGetOTP(email).then((validSecurityCode) => validSecurityCode);

export default addAndGetOTP;
