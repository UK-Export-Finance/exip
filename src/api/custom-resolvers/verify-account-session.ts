import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import { Context } from '.keystone/types'; // eslint-disable-line
import { VerifyAccountSesssionVariables } from '../types';

dotenv.config();

const PRIV_KEY = Buffer.from(String(process.env.JWT_SIGNING_KEY), 'base64').toString('ascii');

const verifyAccountSesssion = async (root: any, variables: VerifyAccountSesssionVariables) => {
  try {
    console.info('Verifying exporter account session');

    const { token } = variables;

    const decode = jsonwebtoken.verify(token, PRIV_KEY);

    if (decode.sub) {
      return {
        success: true,
      };
    }

    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Verifying exporter account session ${err}`);
  }
};

export default verifyAccountSesssion;
