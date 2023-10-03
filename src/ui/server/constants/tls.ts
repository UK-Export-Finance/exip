import * as dotenv from 'dotenv';

dotenv.config();

const { TLS_CERTIFICATE, TLS_KEY } = process.env;

const CERTIFICATE = {
  VALUE: String(TLS_CERTIFICATE).replace(/\\n/g, '\n'),
};

const KEY = {
  VALUE: String(TLS_KEY).replace(/\\n/g, '\n'),
};

export const TLS = {
  CERTIFICATE,
  KEY,
};
