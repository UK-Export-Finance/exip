import axios from 'axios';
import dotenv from 'dotenv';
import { CompaniesHouseAPIResponse } from '../../types';

dotenv.config();

const username: any = process.env.COMPANIES_HOUSE_API_KEY;
const companiesHouseURL: any = process.env.COMPANIES_HOUSE_API_URL;

/**
 * getCompanyHouseDetails
 * makes companies house API call and returns company
 * @param {String} companyNumber
 * @returns {CompaniesHouseAPIResponse} CompanyHouseResponse object
 */
const companiesHouse = {
  getCompanyHouseDetails: async (companyNumber: string): Promise<CompaniesHouseAPIResponse> => {
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

      // if no data in response or status is not 200 then return success as false
      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }

      return {
        data: response.data,
        success: true,
      };
    } catch (err) {
      console.error('Error calling Companies House API', { err });

      throw new Error(`Calling Companies House API. Unable to search for company ${err}`);
    }
  },
};

export default companiesHouse;
