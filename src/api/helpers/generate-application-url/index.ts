import dotenv from 'dotenv';
import { APPLICATION } from '../../constants';

dotenv.config();

const baseUrl = String(process.env.APPLICATION_URL);

/**
 * generateApplicationUrl
 * generates the application url for the given reference number and provided baseUrl
 * @param {Number} referenceNumber
 * @returns {String} applicationUrl
 */
const generateApplicationUrl = (referenceNumber: number): string => `${baseUrl}/${referenceNumber}/${APPLICATION.ALL_SECTIONS}`;

export default generateApplicationUrl;
