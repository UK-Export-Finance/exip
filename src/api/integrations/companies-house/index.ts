import axios from 'axios';
import dotenv from 'dotenv';
import { CompaniesHouseAPIResponse } from '../../types';

dotenv.config();

const username = String(process.env.COMPANIES_HOUSE_API_KEY);
const companiesHouseURL = String(process.env.COMPANIES_HOUSE_API_URL);

/**
 * companiesHouse
 * makes companies house API call and returns company
 * @param {String} companyNumber
 * @returns {CompaniesHouseAPIResponse} CompaniesHouseAPIResponse object
 */
const companiesHouse = {
  get: async (companyNumber: string): Promise<CompaniesHouseAPIResponse> => {
    try {
      const response = await axios({
        method: 'get',
        url: `${companiesHouseURL}/company/${companyNumber}`,
        auth: { username, password: '' },
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });

      if (response.status === 404) {
        return {
          success: false,
          notFound: true,
        };
      }

      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error calling Companies House API %o', error);

      throw new Error(`Calling Companies House API. Unable to search for company ${error}`);
    }
  },
};

export default companiesHouse;
