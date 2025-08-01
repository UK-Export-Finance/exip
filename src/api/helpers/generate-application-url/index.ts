import dotenv from 'dotenv';
import { APPLICATION } from '../../constants';

dotenv.config();

const baseUrl = String(process.env.APPLICATION_URL);

/**
 * generateApplicationUrl
 * generates the application url for the given reference number and provided baseUrl
 * @param {number} referenceNumber: Application reference number
 * @returns {string} applicationUrl
 */
const generateApplicationUrl = (referenceNumber: number): string => `${baseUrl}/${referenceNumber}${APPLICATION.ALL_SECTIONS_ROUTE}`;

export default generateApplicationUrl;
