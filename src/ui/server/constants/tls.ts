import * as dotenv from 'dotenv';
import { sanitise } from '../helpers/sanitise-environment';

dotenv.config();

const { TLS_CERTIFICATE, TLS_KEY } = process.env;

const CERTIFICATE = {
  VALUE: sanitise(TLS_CERTIFICATE),
};

const KEY = {
  VALUE: sanitise(TLS_KEY),
};

export const TLS = {
  CERTIFICATE,
  KEY,
};
