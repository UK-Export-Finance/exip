import axios from 'axios';
import dotenv from 'dotenv';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';
import {
  GetApimCisCountriesResponse,
  GetApimCurrenciesResponse,
  GetApimCurrenciesExchangeResponse,
  ApimSendEmailResponse,
  ApimSendEmailHelperResponse,
} from '../../types';

dotenv.config();

const { APIM_MDM_URL, APIM_MDM_KEY, APIM_MDM_VALUE, GOV_NOTIFY_API_KEY } = process.env;
const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;

interface ResponseObject {
  data?: object;
  status: number;
}

/**
 * statusIsValid
 * Check if a status is valid
 * @param {Number} status
 * @param {Number} expectedStatus. Defaults to 200
 * @returns {Boolean}
 */
export const statusIsValid = (status: number, expectedStatus: number = 200) => status === expectedStatus;

/**
 * responseIsValid
 * Check if a response is valid
 * @param {ResponseObject} response
 * @param {Number} expectedStatus
 * @returns {Boolean}
 */
export const responseIsValid = (response: ResponseObject, expectedStatus?: number) => {
  if (response.data && statusIsValid(response.status, expectedStatus)) {
    return true;
  }

  return false;
};

/**
 * APIM
 * Calls to APIM:
 * - CIS countries
 * @returns {GetApimCisCountriesResponse} GetApimCisCountriesResponse object
 */
const APIM = {
  getCisCountries: async (): Promise<GetApimCisCountriesResponse> => {
    try {
      console.info('Calling APIM - CIS countries');

      const response = await axios({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.MARKETS}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        validateStatus: (status) => statusIsValid(status),
      });

      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - CIS countries %o', error);

      throw new Error(`Calling APIM - CIS countries ${error}`);
    }
  },
  getCurrencies: async (): Promise<GetApimCurrenciesResponse> => {
    try {
      console.info('Calling APIM - currencies');

      const response = await axios({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.CURRENCY}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        validateStatus: (status) => statusIsValid(status),
      });

      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - currencies %o', error);

      throw new Error(`Calling APIM - currencies ${error}`);
    }
  },
  getCurrenciesExchange: async (source: string, target: string): Promise<GetApimCurrenciesExchangeResponse> => {
    try {
      console.info('Calling APIM - currencies exchange');

      const response = await axios({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.CURRENCY_EXCHANGE}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        params: { source, target },
        validateStatus: (status) => statusIsValid(status),
      });

      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - currencies exchange %o', error);

      throw new Error(`Calling APIM - currencies exchange ${error}`);
    }
  },
  /**
   * sendEmail
   * Send an email via APIM
   * @param {String} templateId: Template ID
   * @param {String} sendToEmailAddress: Email recipient
   * @param {Object} personalisation: Custom variables for the email template
   * @returns {ApimSendEmailHelperResponse}
   */
  sendEmail: async (templateId: string, sendToEmailAddress: string, personalisation: object): Promise<ApimSendEmailHelperResponse> => {
    try {
      console.info('Calling APIM - send email - templateId %s', templateId);

      const response: ApimSendEmailResponse = await axios({
        method: 'post',
        url: `${APIM_MDM_URL}${APIM_MDM.EMAIL}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
          govUkNotifyKey: GOV_NOTIFY_API_KEY,
        },
        data: {
          templateId,
          sendToEmailAddress,
          personalisation,
        },
        validateStatus: (status) => statusIsValid(status, 201),
      });

      if (responseIsValid(response, 201)) {
        return {
          success: true,
          emailRecipient: sendToEmailAddress,
        };
      }

      return {
        success: false,
        emailRecipient: sendToEmailAddress,
      };
    } catch (error) {
      console.error('Error calling APIM - send email %o', error);

      throw new Error(`Calling APIM - send email ${error}`);
    }
  },
};

export default APIM;
