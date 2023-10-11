import * as dotenv from 'dotenv';
import express from 'express';
import { SERVICE_NAME } from '../../constants';

dotenv.config();
const { PORT } = process.env;

/**
 * Sets up error handling and listening for an Express server.
 * @param server - An instance of the Express server.
 * @returns void
 */

// @ts-ignore
export const http = (server: express) => {
  server.on('error', (error: any) => console.error('❌ HTTP %s UI failed to start on :%d %s', SERVICE_NAME, PORT, error));
  server.listen(PORT, () => console.info('🌐 HTTP %s UI serving on :%d', SERVICE_NAME, PORT));
};
