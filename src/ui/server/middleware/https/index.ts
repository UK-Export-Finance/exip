import * as dotenv from 'dotenv';
import * as http from 'http';
import tls from 'https';
import { readFileSync } from 'fs';
import { TLS, SERVICE_NAME } from '../../constants';

dotenv.config();
const { UI_PORT } = process.env;

/**
 * Creates an HTTPS server using the `https` module.
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
  const serverOptions = {
    key: readFileSync(TLS.KEY.NAME),
    cert: readFileSync(TLS.CERTIFICATE.NAME),
  };

  const ui = tls.createServer(serverOptions, server);

  ui.on('error', (error) => console.error('❌ TLS %s UI failed to start on :%d %s', SERVICE_NAME, UI_PORT, error));

  ui.listen(UI_PORT, () => console.info('🔐 TLS %s UI serving on :%d', SERVICE_NAME, UI_PORT));
};
