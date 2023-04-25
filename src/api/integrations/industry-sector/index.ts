import axios from 'axios';
import dotenv from 'dotenv';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';

dotenv.config();

const { MULESOFT_MDM_EA } = EXTERNAL_API_ENDPOINTS;

const username: any = process.env.MULESOFT_API_MDM_EA_KEY;
const secret: any = process.env.MULESOFT_API_MDM_EA_SECRET;
const industrySectorUrl: any = `${process.env.MULESOFT_API_MDM_EA_URL}${MULESOFT_MDM_EA.INDUSTRY_SECTORS}`;

/**
 * getIndustrySectorNames
 * Get
 * @returns {Object} Object with success flag array with all industry sectors
 */
const getIndustrySectorNames = async () => {
  try {
    console.info('Calling industry sector API');

    const response = await axios({
      method: 'get',
      url: `${industrySectorUrl}`,
      auth: { username, password: secret },
      validateStatus(status) {
        const acceptableStatus = [200, 404];
        return acceptableStatus.includes(status);
      },
    });

    // if no data in response or status is not 200 then return blank object
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
    console.error('Error calling industry sector API ', { err });
    return {
      apiError: true,
      success: false,
    };
  }
};

export default getIndustrySectorNames;
