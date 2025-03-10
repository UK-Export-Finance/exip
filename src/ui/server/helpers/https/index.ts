import * as dotenv from 'dotenv';
import * as http from 'http';
import tls from 'https';
import { TLS, SERVICE_NAME } from '../../constants';

dotenv.config();
const { PORT } = process.env;

/**
 * Create an HTTPS server using the `https` module.
 * Reads the key and certificate files from the specified location.
 * Starts the server on the specified port.
 *
 * @param server - A function that handles HTTP requests.
 * @returns None
 *
 * @example
 * import { https } from './path/to/https';
 *
 * const server = (req, res) => {
 *   // handle requests
 * };
 *
 * https(server);
 */
export const https = (server: http.RequestListener) => {
  if (!TLS.CERTIFICATE.VALUE) {
    throw new Error('Invalid TLS certificate!');
  }

  if (!TLS.KEY.VALUE) {
    throw new Error('Invalid TLS key!');
  }

  const serverOptions = {
    key: TLS.KEY.VALUE,
    cert: TLS.CERTIFICATE.VALUE,
  };

  const ui = tls.createServer(serverOptions, server);

  ui.on('error', (error) => console.error('❌ TLS %s UI failed to start on :%d %s', SERVICE_NAME, PORT, error));

  ui.listen(PORT, () => console.info('🔐 TLS %s UI serving on :%d', SERVICE_NAME, PORT));
};
