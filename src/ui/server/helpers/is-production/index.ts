import * as dotenv from 'dotenv';
import { ENVIRONMENTS } from '../../constants';

dotenv.config();
const { NODE_ENV } = process.env;

/**
 * Checks if the code is running in a production environment.
 * @returns {boolean} - Returns true if the code is running in a production environment, false otherwise.
 */
export const isProduction = (): boolean => NODE_ENV === ENVIRONMENTS.PRODUCTION;
