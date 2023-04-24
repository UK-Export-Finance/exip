import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const username: any = process.env.MULESOFT_API_UKEF_MDM_EA_KEY;
const secret: any = process.env.MULESOFT_API_UKEF_MDM_EA_SECRET;
const industrySectorUrl: any = process.env.UKEF_INDUSTRY_SECTOR_API;

/**
 * getIndustrySectorNames
 * Get
 * @returns {Object} Object with success flag array with all industry sectors
 */
const getIndustrySectorNames = async () => {
  try {
    console.info('Calling map industry sector API');

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
    if (!response.data || response.status === 404) {
      return {
        success: false,
      };
    }

    return {
      data: response.data,
      success: true,
    };
  } catch (err) {
    console.error('Error calling map industry sector API ', { err });
    return {
      apiError: true,
      success: false,
    };
  }
};

export default getIndustrySectorNames;
